import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import assert from "assert";
import { NextApiRequest, NextApiResponse } from "next";
import { PaddleSDK } from "paddle-sdk";

// @see https://sandbox-vendors.paddle.com/fulfillment/webhook/47429
type PaddleWebhookBody = {
  p_product_id: number;
  p_price: number;
  p_country: string;
  p_currency: string;
  p_sale_gross: number;
  p_tax_amount: number;
  p_paddle_fee: number;
  p_coupon_savings: number;
  p_earnings: string;
  p_order_id: number;
  p_coupon: string;
  p_used_price_override: boolean;
  p_custom_data: null;
  passthrough: string;
  p_quantity: number;
  quantity: number;
  event_time: string;
};

const DUMMY_PADDLE_SANDBOX_BODY: PaddleWebhookBody = {
  p_product_id: 47429,
  p_price: 4.99,
  p_country: "US",
  p_currency: "USD",
  p_sale_gross: 4.99,
  p_tax_amount: 0,
  p_paddle_fee: 0.75,
  p_coupon_savings: 0,
  p_earnings: '{"9482":"4.2400"}',
  p_order_id: 578739,
  p_coupon: "",
  p_used_price_override: true,
  p_custom_data: null,
  passthrough:
    '{"userUID":"00591c1a-6123-4fed-a552-2178522e206f","userEmail":"gilberttim09@gmail.com"}',
  p_quantity: 1,
  quantity: 1,
  event_time: "2023-03-19 15:42:47",
};

/**
 * Handles the Paddle webhook for when a user purchases credits
 * This hook will NEVER be called on localhost because Paddle will not send webhooks to localhost. Thanks for nothing, Paddle!
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @see https://developer.paddle.com/webhook-reference/da25d9740f4c7-fulfillment-webhook
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  assert(
    typeof process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID === "string",
    "NEXT_PUBLIC_PADDLE_VENDOR_ID is not set"
  );
  assert(
    typeof process.env.PADDLE_API_KEY === "string",
    "PADDLE_API_KEY is not set"
  );
  assert(
    typeof process.env.PADDLE_PUBLIC_KEY === "string",
    "PADDLE_PUBLIC_KEY is not set"
  );

  // Verify Paddle Signature only on non-dev environments
  const devMode = process.env.NODE_ENV === "development";

  if (!devMode) {
    const client = new PaddleSDK(
      process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID,
      process.env.PADDLE_API_KEY,
      process.env.PADDLE_PUBLIC_KEY,
      {
        sandbox: devMode,
      }
    );

    // Check if the request is a valid paddle request
    const isValid = client.verifyWebhookData(req.body);

    // Return 401 if the request is not valid
    if (!isValid) {
      res.status(401).send("Unauthorized. Code: PAY0201.");
      return;
    }
  } else {
    console.log("Skip Validating Paddle Signature...");
  }

  // Get Payment Data
  // const event = devMode
  //   ? DUMMY_PADDLE_SANDBOX_BODY
  //   : (req.body as PaddleWebhookBody);

  const event = req.body as PaddleWebhookBody;

  const { userUID, userEmail } = JSON.parse(event.passthrough);

  if (!userUID || !userEmail) {
    res.status(400).send("Bad Request");
    return;
  }

  // Update user subscription status
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_TOKEN;

  if (!supabaseUrl || !supabaseKey) {
    res.status(500).send("Internal Server Error");
    return;
  }

  const supabase = createClient<Database>(supabaseUrl!, supabaseKey!, {
    auth: {
      persistSession: false,
    },
  });

  const { data } = await supabase
    .from("profiles")
    .select(`credits`)
    .eq("id", userUID)
    .single();

  if (!data?.credits) {
    res.status(500).send("Internal Server Error");
    return;
  }

  const { error } = await supabase
    .from("profiles")
    .update({ credits: data?.credits + 10 })
    .eq("id", userUID);

  if (error) {
    res.status(404).send("Not found");
    return;
  }

  res.status(200).send("OK");
};

export default handler;
