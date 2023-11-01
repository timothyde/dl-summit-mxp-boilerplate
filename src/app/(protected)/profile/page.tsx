import { Headline } from "@/components/headline";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AccountForm from "./account-form";

export const dynamic = 'force-dynamic'

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="space-y-12 w-full">
        <Headline text="Account" />
        <AccountForm session={session} />
      </div>
    </div>
  );
}
