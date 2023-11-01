import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export const products = [
  {
    name: "Pay-per-Use",
    id: process.env.NEXT_PUBLIC_PADDLE_PRODUCT_ID,
    href: `/checkout/${process.env.NEXT_PUBLIC_PADDLE_PRODUCT_ID}`,
    price: "9.99€",
    isMonthly: false,
    isActive: true,
    description: "Product description goes here.",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  },
];

export default function Pricing() {
  return (
    <div className="isolate overflow-hidden">
      <div className="px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Ad eiusmod anim cupidatat voluptate
            <br className="hidden sm:inline lg:hidden" />
            Aliquip excepteur labore ut enim.
          </p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-900/60">
            Aliquip minim id fugiat est anim nulla laboris. Anim enim incididunt
            aliqua officia amet. Ex dolor anim aute sunt nostrud proident minim
            deserunt esse dolore laborum ullamco aliquip enim. Sit tempor magna
            quis qui ullamco magna occaecat ut pariatur.
          </p>
          <svg
            viewBox="0 0 1208 1024"
            className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
          >
            <ellipse
              cx={604}
              cy={512}
              fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)"
              rx={604}
              ry={512}
            />
            <defs>
              <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flow-root bg-white pb-24 sm:pb-32">
        <div className="-mt-80">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
              {products.map((tier) => (
                <div
                  key={tier.id}
                  className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
                >
                  <div>
                    <h3
                      id={tier.id}
                      className="text-base font-semibold leading-7 text-indigo-600"
                    >
                      {tier.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        {tier.price}
                      </span>
                      {tier.isMonthly && (
                        <span className="text-base font-semibold leading-7 text-gray-600">
                          per month
                        </span>
                      )}
                    </div>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                      {tier.description}
                    </p>
                    <ul
                      role="list"
                      className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
                    >
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon
                            className="h-6 w-5 flex-none text-indigo-600"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {tier.isActive ? (
                    <Link
                      href={tier.href}
                      aria-describedby={tier.id}
                      className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Go to checkout!
                    </Link>
                  ) : (
                    <div
                      aria-describedby={tier.id}
                      className="mt-8 block rounded-md cursor-not-allowed bg-gray-300 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-gray-600 shadow-sm"
                    >
                      Derzeit nicht verfügbar
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center">
                <div className="lg:min-w-0 lg:flex-1">
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
                    Enterprise
                  </h3>
                  <p className="mt-1 text-base leading-7 text-gray-600">
                    Voluptate nostrud eu aliquip commodo consequat non
                    adipisicing elit laboris adipisicing. Exercitation
                    exercitation deserunt irure laboris consectetur sunt elit
                    minim elit irure minim consequat. Duis commodo qui officia
                    aute mollit. Sunt laboris in nisi veniam.
                  </p>
                </div>
                <a
                  href="#"
                  className="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Contact sales <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
