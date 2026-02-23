import type { Route } from "./+types/contact";
import { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    interestType: "Family",
    message: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_STRAPI_URL}/api/contact-submissions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: form }),
        }
      );

      if (!res.ok) throw new Error("Submission failed");

      setSuccess(true);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        interestType: "Family",
        message: "",
      });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen px-6 pt-6 pb-6">
      <div className="h-full relative overflow-hidden rounded-[28px] border border-black/10">

        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 -z-30 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1771030668686-2347bfbaf532?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        />

        {/* Bottom Gradient (50%) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/85 via-black/50 to-transparent -z-20" />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

        {/* INNER WRAPPER */}
        <div className="relative h-full min-h-175 px-8 py-20 md:px-90">

          <div className="grid h-full items-center gap-20 lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div
              className={`text-white transition-all duration-1000 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm backdrop-blur-md">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                Contact Us
              </div>

              <h1 className="mt-8 text-[56px] leading-[1.05] font-semibold tracking-tight">
                Start the Conversation
              </h1>

              <p className="mt-6 max-w-lg text-lg text-white/75 leading-relaxed">
                Whether you’re a family, partner, or investor, we’re here to
                listen and respond thoughtfully.
              </p>
            </div>

            {/* RIGHT FORM */}
            <div
              className={`relative transition-all duration-1000 delay-150 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Soft Glow */}
              <div className="absolute inset-0 rounded-[28px] bg-white/20 blur-xl" />

              <div className="relative rounded-[26px] bg-white/95 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl max-w-105 ml-auto">

                <h2 className="text-xl font-semibold text-neutral-900">
                  Let’s Talk
                </h2>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-black transition"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-black transition"
                  />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-black transition"
                  />

                  <select
                    name="interestType"
                    value={form.interestType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-black transition"
                  >
                    <option>Family</option>
                    <option>Insurance Partner</option>
                    <option>Healthcare Provider</option>
                    <option>Investor</option>
                    <option>Sakhi Applicant</option>
                    <option>Media</option>
                  </select>

                  <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-black transition"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-black py-2.5 text-sm text-white transition hover:bg-neutral-800 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>

                  {success && (
                    <p className="text-xs text-green-600">
                      Thank you. We’ll respond within 24–48 hours.
                    </p>
                  )}

                  {error && (
                    <p className="text-xs text-red-600">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
