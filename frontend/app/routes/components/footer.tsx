export default function Footer() {
  return (
    <footer className="px-6 pb-6 pt-14">
      <div className="mx-auto max-w1 rounded-2xl border border-white/10 bg-black text-white">

        {/* TOP GRID */}
        <div className="grid gap-12 px-10 py-14 md:grid-cols-2 lg:grid-cols-[2.5fr_1fr_1fr_1fr_1fr]">

          {/* BRAND COLUMN */}
          <div className="space-y-6">
            {/* logo placeholder */}
            <div className="h-6 w-6 rounded-full bg-indigo-500" />

            <p className="max-w-xs text-sm text-white/60 leading-relaxed">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-5 text-white/60">
              <span>f</span>
              <span>ig</span>
              <span>x</span>
              <span>gh</span>
              <span>yt</span>
            </div>
          </div>

          {/* SOLUTIONS */}
          <FooterColumn
            title="Solutions"
            links={["Insurance", "Health Survey", "Trend Analysis", "Insights"]}
          />

          {/* SUPPORT */}
          <FooterColumn
            title="Support"
            links={["Submit ticket", "Documentation", "Guides"]}
          />

          {/* COMPANY */}
          <FooterColumn
            title="Company"
            links={["About", "Blog", "Jobs"]}
          />

          {/* LEGAL */}
          <FooterColumn
            title="Legal"
            links={["Terms of service", "Privacy policy", "License"]}
          />
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 px-10 py-6 text-sm text-white/50">
          © 2025 Ropan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- */
/* Reusable Column Component */
/* --------------------------------- */

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-white/90">{title}</h3>

      <ul className="space-y-3 text-sm text-white/60">
        {links.map((link) => (
          <li key={link}>
            <a className="transition-colors hover:text-white">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
