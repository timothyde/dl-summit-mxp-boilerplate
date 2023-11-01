import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Header } from "./header";
import Footer from "./footer";

export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = createServerComponentClient({ cookies })
  const user = await supabase.auth.getUser()

  return (
    <html lang="en" className="h-full">
      <body className="h-full text-gray-900 bg-white">
        <div className="min-h-full bg-white">
          <Header user={user.data.user}/>
          {children}
          <Footer />
        </div>
        <ToastContainer/>
      </body>
    </html>
  );
}
