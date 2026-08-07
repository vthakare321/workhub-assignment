import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}

      <aside className="w-64 border-r bg-white">
        Sidebar
      </aside>

      {/* Content */}

      <div className="flex flex-1 flex-col">
        {/* Header */}

        <header className="h-16 border-b bg-white px-6">
          Header
        </header>

        {/* Main */}

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
