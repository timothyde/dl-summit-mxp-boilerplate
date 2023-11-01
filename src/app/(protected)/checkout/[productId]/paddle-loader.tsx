"use client";

import Script from "next/script";

declare global {
  var Paddle: any;
}

export const PaddleLoader = () => {
  return (
    <Script
      src="https://cdn.paddle.com/paddle/paddle.js"
      onLoad={() => {
        if (process.env.NEXT_PUBLIC_PADDLE_SANDBOX === "true") {
          Paddle.Environment.set("sandbox");
        }
        Paddle.Setup({
          vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
        });
      }}
    />
  );
};
