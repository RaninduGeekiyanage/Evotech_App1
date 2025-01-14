import UserNav from "./components/user-nav";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex max-h-screen overflow-hidden bg-gray-100">
      {/* side pannel */}
      <aside className="w-64 overflow-y-auto border-r bg-white shadow-lg">
        Side Panel
      </aside>

      {/* Wrapper */}
      <div className="bg-gray-500 flex flex-1 flex-col overflow-hidden">
        {/* Dashboard Header */}
        <header className="bg-white flex h-16 items-center justify-between gap-4 border-b px-6 shadow-sm">
          <h1 className="text-2xl font-bold text-blue-800">Download latest Mflix Movies..</h1>
          <UserNav />
        </header>
        {/* Dashboard pages */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
