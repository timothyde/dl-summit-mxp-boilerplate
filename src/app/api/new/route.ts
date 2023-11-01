import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { RequestCookies } from "@edge-runtime/cookies";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { uuid } = await req.json();

  const cookies = new RequestCookies(req.headers) as any;
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if there's no user, return http status 401
  if (!user) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 401,
    });
  }

  // get credits for this user
  const { data: creditsData, error: creditsError } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", user.id)
    .single();

  // if there are no credits, return http status 402
  if (!creditsData?.credits || creditsData?.credits < 1) {
    return new Response(JSON.stringify({ error: "Insufficient credits" }), {
      status: 402,
    });
  }

  // this is where you perform your main service
  const data = {
    text: "Something valuable",
  };

  // reduce credits accordingly
  await supabase
    .from("profiles")
    .update({ credits: creditsData.credits! - 1 })
    .eq("id", user.id)
    .single();

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
