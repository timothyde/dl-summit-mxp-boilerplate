import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic'

export const getServerIsSubscribed = async (client?: SupabaseClient) => {
  const supabase = client ? client : createServerComponentClient({ cookies });
  const user = await supabase.auth.getUser();

  if (!user?.data.user?.id) {
    return false;
  }

  let { data, error, status } = await supabase
    .from("profiles")
    .select(`subscribed`)
    .eq("id", user.data.user?.id)
    .single();

  if (error && status !== 406) {
    return false;
  }

  if (data) {
    return !!data.subscribed;
  }

  return false;
};
