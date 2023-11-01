"use client";

import { User } from "@supabase/supabase-js";
import { products } from "../../../pricing/page";
import { PaddleLoader } from "./paddle-loader";

const product = products[0];

export const CheckoutButton: React.FC<{ user: User }> = ({ user }) => {
  const handleCheckoutClick = () => {

    if (Paddle) {
      Paddle.Checkout.open({
        product: product.id,
        passthrough: JSON.stringify({
          userUID: user.id,
          userEmail: user.email,
        }),
        allowQuantity: false,
      });
    }
  };

  return (
    <>
      <PaddleLoader />
      <button
        onClick={handleCheckoutClick}
        className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        Open checkout &rarr;
      </button>
    </>
  );
};
