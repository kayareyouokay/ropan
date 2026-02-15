import { Outlet } from "react-router";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">

      {/* Floating Navbar */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="relative">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
