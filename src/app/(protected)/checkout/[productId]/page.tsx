import { getServerIsSubscribed } from "@/utils/profile-helpers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { products } from "../../../pricing/page";
import { CheckoutButton } from "./checkout-button";

export const dynamic = "force-dynamic";

export default async function Checkout({
  params,
}: {
  params: { productId: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const userData = await supabase.auth.getUser();

  const user = userData?.data.user;

  const product = products.find((product) => product.id === params.productId);

  if (!user) {
    <div className="min-h-full flex-grow bg-white flex flex-col">
      <div className="flex-grow">
        <main className="isolate">
          <div className="flex flex-col pt-12 p-4">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="uppercase text-gray-900 font-bold">
                You are not signed in.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>;
  }

  if (!product) {
    return (
      <div className="min-h-full flex-grow bg-white flex flex-col">
        <div className="flex-grow">
          <main className="isolate">
            <div className="flex flex-col pt-12 p-4">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <p className="uppercase text-gray-900 font-bold">
                  Product not found.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex-grow bg-white flex flex-col">
      <div className="flex-grow">
        <main className="isolate">
          <div className="flex flex-col pt-12 p-4">
            <div id="pricing">
              <h1 className="text-gray-900 text-6xl font-bold py-8 pr-24">
                Checkout
              </h1>
              <p className="pt-8 text-gray-600 uppercase text-xs">
                Your selected product
              </p>
              <h2 className="text-gray-900 text-xl font-bold pb-6">
                {product.name}, {product.price}{" "}
                {product.isMonthly ? "pro Monat." : "einmalig."}
              </h2>
              <div className="flex flex-col items-start gap-4">
                <p className="text-md text-gray-600">
                  Start the checkout process by clicking the button below. A
                  separate window will open where you can complete the checkout
                  process through Paddle, our payment processor.
                </p>
                <CheckoutButton user={user!} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
