export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex-grow flex flex-col">
      <div className="bg-white text-gray-900 grow flex justify-center items-center px-4">
        <main className="isolate max-w-full overflow-hidden pb-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 flex flex-col pt-12">{children}</div>
        </main>
      </div>
    </div>
  );
}
