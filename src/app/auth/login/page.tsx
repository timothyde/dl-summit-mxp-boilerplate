import { Logo } from "@/components/logo";
import AuthForm from "./auth-form";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex min-h-full flex-1 bg-white">
      <div className="flex flex-1 w-full justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Logo />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Get started without a password
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Each new user receives 3 free credits to try out the service. If
              you need more, you can always{" "}
              <Link
                href="/pricing"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                purchase credits
              </Link>{" "}
              after you have signed up. Enter your email address, and we&apos;ll
              send you a link to sign in.
            </p>
          </div>
          <div className="mt-10">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}
