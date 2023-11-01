"use client";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { I18nVariables, ThemeSupa } from "@supabase/auth-ui-shared";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      localization={
        {
          variables: {
            email_input_label: "E-Mail-Adresse",
            email_input_placeholder: "E-Mail-Adresse eingeben",
            button_label: "Login-Link senden",
            loading_button_label: "Sende Login-Link...",
            link_text: "Schicke eine Login-Link per E-Mail",
            confirmation_text: "Prüfen Sie Ihre E-Mails auf einen Login-Link.",
          },
        } as { variables: I18nVariables }
      }
      appearance={{ theme: ThemeSupa }}
      theme="light"
      showLinks={false}
      providers={[]}
      redirectTo={`${BASE_URL}/auth/callback`}
    />
  );
}
