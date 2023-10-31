"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect, useState } from "react";

const AuthModal = () => {
  const [desc, setDesc] = useState("")
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen, view } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }

    if (view === "sign_up") {
      setDesc("Create your account!")
    } else if (view === "sign_in") {
      setDesc("Log back into your account!")
    }
    
  }, [session, router, onClose, view])

  const onChange = (open: boolean) => {
    if (!isOpen) {
      onClose();
    }
  }

  return (
    <Modal
      title="Welcome Back"
      description={desc}
      isOpen={isOpen}
      onChange={onChange}
      onClose={onClose}
    >
      <Auth
        theme="dark"
        magicLink
        view={view}
        providers={[]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
            }
          }
        }}/>
    </Modal>
  );
}

export default AuthModal;
