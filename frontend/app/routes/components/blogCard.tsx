import { Link } from "react-router";

type Blog = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime?: number;
  coverImage: {
    url: string;
    formats?: {
      medium?: { url: string };
      small?: { url: string };
    };
  };
  author?: {
    name: string;
    photo?: {
      url: string;
      formats?: {
        thumbnail?: { url: string };
      };
    };
  };
};

export default function BlogCard({ blog }: { blog: Blog }) {
  const base = import.meta.env.VITE_STRAPI_URL;

  const coverUrl =
    base +
    (blog.coverImage?.formats?.medium?.url ??
      blog.coverImage?.url ??
      "");

  const authorPhotoPath =
    blog.author?.photo?.formats?.thumbnail?.url ??
    blog.author?.photo?.url;

  const authorPhoto = authorPhotoPath
    ? base + authorPhotoPath
    : null;

  return (
    <Link
      to={`/blog/${blog.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      prefetch="intent"
      className="group block outline-none"
    >
      <article
        className="
          flex flex-col gap-5
          transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
          will-change-transform
          group-hover:-translate-y-1.5
        "
      >
        {/* IMAGE */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src={coverUrl}
            alt={blog.title}
            className="
              h-40 w-full object-cover
              transform-gpu
              transition-transform duration-900 ease-out
              group-hover:scale-[1.08] md:h-75
            "
          />
        </div>

        {/* META */}
        <p className="text-base font-semibold text-neutral-500">
          {new Date(blog.publishedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
          {blog.readTime ? ` · ${blog.readTime} mins read` : ""}
        </p>

        {/* TITLE + EXCERPT */}
        <div>
          <h3 className="
            text-xl font-semibold leading-snug tracking-[-0.01em] line-clamp-1
            transition-colors duration-300
            group-hover:text-neutral-900
          ">
            {blog.title}
          </h3>

          <p className="
            mt-1.5 text-base font-normal text-neutral-600 line-clamp-2
            transition-colors duration-300
            group-hover:text-neutral-700
          ">
            {blog.excerpt}
          </p>
        </div>

        {/* AUTHOR */}
        {blog.author && (
          <div className="mt-2 flex items-center gap-3">
            {authorPhoto && (
              <img
                src={authorPhoto}
                alt={blog.author.name}
                className="
                  h-8 w-8 rounded-full object-cover object-top
                  transition-transform duration-300
                  group-hover:scale-105
                "
              />
            )}

            <span className="text-base font-semibold text-neutral-800">
              {blog.author.name}
            </span>
          </div>
        )}

        {/* PREMIUM DIVIDER LINE */}
        <div className="mt-3 h-px w-full overflow-hidden">
          <span
            className="
              block h-full w-0 mx-auto
              bg-neutral-300
              transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:w-full
            "
          />
        </div>
      </article>
    </Link>
  );
}
