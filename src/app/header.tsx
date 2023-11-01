"use client";

import { Logo } from "@/components/logo";
import { classNames } from "@/utils/classNames";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import { User } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "./globals.css";

export const Header: React.FC<{ user: User | null }> = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  const navigation: Array<{name: string, href: string, current: boolean}> = [
    { name: "Create New", href: "/new", current: pathname === "/new" },
    { name: "Pricing", href: "/pricing", current: pathname === "/pricing" },
  ]

  return (
    <>
      <nav className="z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex w-full">
              <Logo />
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium cursor-pointer"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {user ? (
                <div className="hidden grow items-center lg:flex lg:flex-1 gap-2 justify-end">
                  <Link
                    href="/profile"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-regular text-gray-900 hover:bg-gray-50 inline-flex items-center gap-2"
                  >
                    <UserIcon className="h-6 w-6 text-gray-400" />
                    {user?.email}
                  </Link>
                  <form action="/auth/signout" method="post">
                    <button
                      type="submit"
                      className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </form>
                </div>
              ) : (
                <div className="hidden lg:flex lg:flex-1 items-center gap-2 lg:justify-end">
                  <Link
                    href="/profile"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/auth/login"
                    className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                  >
                    Login <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              )}
              <div className="w-full flex justify-end items-center lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <div className="-m-1.5 p-1.5">
              <span className="sr-only">Your MxP Boilerplate</span>
              <Logo/>
            </div>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {user ? (
                <div className="py-6">
                  <Link
                    href="/profile"
                    className="-mx-3 inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <UserIcon className="h-6 w-6 text-gray-400" />
                    {user?.email}
                  </Link>
                  <form action="/auth/signout" method="post">
                    <button
                      type="submit"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </form>
                </div>
              ) : (
                <div className="py-6">
                  <Link
                    href="/profile"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-indigo-600 text-white hover:bg-indigo-500"
                  >
                    Los geht&apos;s
                  </Link>
                  <Link
                    href="auth/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
