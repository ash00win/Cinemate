import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <Navbar />

      <main className="w-full overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
