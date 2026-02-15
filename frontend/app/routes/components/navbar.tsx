import { useEffect, useState } from "react";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      // show when scrolling up, hide when scrolling down
      if (current > lastScroll && current > 80) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScroll(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header
      className={`fixed left-0 right-0 top-12 z-50 transition-transform duration-300
      ${show ? "translate-y-0" : "-translate-y-[190%]"}`}
    >
      <nav className="mx-auto flex w-[92%] max-w-7xl items-center justify-between rounded-full bg-black/40 px-6 py-3 text-white backdrop-blur-md">

        {/* LOGO */}
        <span className="text-lg font-semibold">ropan</span>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-6 text-base font-medium md:flex">
          <a className="hover:text-white/70 cursor-pointer">Home</a>
          <a className="hover:text-white/70 cursor-pointer">About</a>
          <a className="hover:text-white/70 cursor-pointer">How Ropan Works</a>
          <a className="hover:text-white/70 cursor-pointer">For Families</a>
          <a className="hover:text-white/70 cursor-pointer">For Investors</a>
          <a className="hover:text-white/70 cursor-pointer">Blog</a>
          <a className="hover:text-white/70 cursor-pointer">Contact</a>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          <button className="hidden rounded-full bg-white px-4 py-2 text-base text-black md:block">
            Get a quote
          </button>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`mx-auto mt-3 w-[92%] max-w-7xl overflow-hidden rounded-2xl bg-black/60 text-white backdrop-blur-md transition-all duration-300 md:hidden
        ${mobileOpen ? "max-h-100 p-6" : "max-h-0 p-0"}`}
      >
        <div className="flex flex-col gap-4 text-sm">
          <a>Home</a>
          <a>About</a>
          <a>How Ropan Works</a>
          <a>For Families</a>
          <a>For Investors</a>
          <a>Blog</a>
          <a>Contact</a>

          <button className="mt-2 rounded-full bg-white px-4 py-2 text-black">
            Get a quote
          </button>
        </div>
      </div>
    </header>
  );
}
