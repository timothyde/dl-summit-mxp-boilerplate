import Link from "next/link";

export default async function Success() {
  return (
    <div className="min-h-full flex-grow bg-white flex flex-col">
      <div className="flex-grow">
        <main className="isolate">
          <div className="flex flex-col pt-12 p-4">
            <div id="pricing">
              <h1 className="text-gray-900 text-6xl font-bold py-8 pr-24">
                Hooray!
              </h1>
              <div className="flex flex-col gap-4 items-start">
                <p className="text-md text-gray-600">
                  Checkout completed successfully
                </p>
                <Link
                  href="/new"
                  className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                  Get started now &rarr;
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
