export const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="py-10">
    <main>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </div>
    </main>
  </div>
);
