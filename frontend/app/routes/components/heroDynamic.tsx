import { useEffect, useState } from "react";
import { Link } from "react-router";

type Blog = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime?: string;
  coverImage: {
    url: string;
    formats?: {
      large?: { url: string };
    };
  };
  author?: {
    name: string;
    photo?: {
      url: string;
      formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
      };
    };
  };
};

export default function Hero({ items }: { items: Blog[] }) {
  const [index, setIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const item = items[index];

  const imageUrl =
    import.meta.env.VITE_STRAPI_URL +
    (item.coverImage?.formats?.large?.url ??
      item.coverImage?.url);

  /* ---------------- AUTO SLIDE ---------------- */

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [items.length]);

  /* -------------------------------------------- */

  return (
    <section className="h-screen px-6 pt-6 pb-6">
      <div className="h-full relative overflow-hidden rounded-[28px] border border-black/10">

        {/* BACKGROUND */}
        <img
          key={imageUrl}
          src={imageUrl}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover scale-105 transition-all duration-1200 ease-out"
        />

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t h-1/2 from-black/90 via-black/40 to-transparent" />

        {/* CONTENT */}
        <div className="h-full relative z-10 min-h-160 text-white">

          {/* LEFT-ALIGNED CONTENT BLOCK */}
          <Link
            to={`/blog/${item.slug}`}
            target="_blank"
            prefetch="intent"
            className="absolute bottom-10 left-6 max-w-8xl block md:left-12 md:bottom-16"
          >

            {/* DATE + READ TIME */}
            <p className="mb-4 text-lg font-medium text-white/70">
              {new Date(item.publishedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              {item.readTime ? ` · ${item.readTime} Mins Read` : ""}
            </p>

            {/* TITLE */}
            <h1 className="text-4xl font-semibold leading-[1.1] md:text-6xl">
              {item.title}
            </h1>

            {/* EXCERPT */}
            <p className="mt-4 text-lg max-w-4xl text-white/70 md:tet-xl">
              {item.excerpt}
            </p>

            {/* DOTS */}
            <div className="mt-8 flex gap-3">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-3 w-3 rounded-full transition-all ${
                    i === index
                      ? "bg-white"
                      : "bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

          </Link>
        </div>
      </div>
    </section>
  );
}
