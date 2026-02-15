import {
  useLoaderData,
  isRouteErrorResponse,
} from "react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

/* ---------------- TYPES ---------------- */

type Blog = {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
  readTime?: number;
  coverImage: {
    url: string;
    formats?: {
      large?: { url: string };
    };
  };
  author?: {
    name: string;
    role?: string;
    photo?: {
      url: string;
      formats?: {
        thumbnail?: { url: string };
      };
    };
  };
};

/* ---------------- LOADER ---------------- */

export async function loader({ params }: any) {
  const STRAPI_URL =
    process.env.VITE_STRAPI_URL ?? "http://localhost:1337";

  if (!params.slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const res = await fetch(
    `${STRAPI_URL}/api/blogs?filters[slug][$eq]=${params.slug}&populate[coverImage]=true&populate[author][populate][photo]=true`
  );

  const json = await res.json();

  const blog = json?.data?.[0];

  if (!blog) {
    throw new Response("Not Found", { status: 404 });
  }

  return { blog };
}

/* ---------------- PAGE ---------------- */

export default function BlogDetail() {
  const { blog } = useLoaderData() as { blog: Blog };

    /* ---------------- SCROLL EFFECTS ---------------- */

  const [progress, setProgress] = useState(0);
  const [blur, setBlur] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const scrolled = height > 0 ? (scrollTop / height) * 100 : 0;
      setProgress(scrolled);

      // cinematic hero blur
      const blurAmount =
        scrollTop > 80
          ? Math.min((scrollTop - 80) / 120, 12)
          : 0;

      setBlur(blurAmount);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const base = import.meta.env.VITE_STRAPI_URL;

  const coverUrl =
    base +
    (blog.coverImage?.formats?.large?.url ??
      blog.coverImage?.url);

  const authorPhotoPath =
    blog.author?.photo?.formats?.thumbnail?.url ??
    blog.author?.photo?.url;

  const authorPhoto = authorPhotoPath
    ? base + authorPhotoPath
    : null;

  return (
    <main className="mx-auto max-w-5xl px-6 pt-30 pb-32 md:pt-40">

      <div className="fixed left-0 top-0 z-50 h-0.75 w-full pointer-events-none">

        {/* GLOW LAYER */}
        <div
          className="absolute inset-y-0 left-0 blur-md opacity-60 bg-neutral-900 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />

        {/* SOLID BAR */}
        <div
          className="relative h-full bg-neutral-900 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />

      </div>

      {/* HERO IMAGE */}
      <div className="overflow-hidden rounded-3xl">
        <img
          src={coverUrl}
          alt={blog.title}
          style={{ filter: `blur(${blur}px)` }}
          className="h-105 w-full object-cover transition-[filter] duration-200 ease-out"/>
      </div>

      {/* META */}
      <div className="mt-8">
        <p className="text-base font-semibold text-neutral-500">
          {new Date(blog.publishedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
          {blog.readTime ? ` · ${blog.readTime} mins read` : ""}
        </p>

        <h1 className="mt-3 text-5xl font-semibold tracking-[-0.02em] leading-[1.1]">
          {blog.title}
        </h1>
      </div>

      {/* AUTHOR */}
      {blog.author && (
        <div className="mt-6 flex items-center gap-4">
          {authorPhoto && (
            <img
              src={authorPhoto}
              alt={blog.author.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          )}

          <div>
            <p className="font-medium">
              {blog.author.name}
            </p>

            {blog.author.role && (
              <p className="text-sm text-neutral-500">
                {blog.author.role}
              </p>
            )}
          </div>
        </div>
      )}

      {/* DIVIDER */}
      <div className="my-12 h-px w-full bg-neutral-200" />

      {/* CONTENT */}
      <article className="prose prose-neutral max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} >
          {blog.content}
        </ReactMarkdown>
      </article>

    </main>
  );
}

/* ---------------- ERROR BOUNDARY ---------------- */

export function ErrorBoundary({ error }: any) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested blog could not be found."
        : error.statusText;
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-5xl font-semibold">{message}</h1>
      <p className="mt-4 text-neutral-500">{details}</p>
    </main>
  );
}
