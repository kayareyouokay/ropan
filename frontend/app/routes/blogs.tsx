import type { Route } from "./+types/blogs";
import Hero from "./components/heroDynamic";
import BlogCard from "./components/blogCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blogs" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const STRAPI_URL =
    process.env.VITE_STRAPI_URL ?? "http://localhost:1337";

  const res = await fetch(
    `${STRAPI_URL}/api/blogs?populate[coverImage]=true&populate[author][populate][photo]=true&sort=publishedAt:desc`
  );

  const json = await res.json();
  const blogs = Array.isArray(json?.data) ? json.data : [];

  return { blogs };
}


export default function Blogs({ loaderData }: any) {
  const blogs = loaderData.blogs ?? [];
  const latestThree = blogs.slice(0, 3);

  return (
    <>
      <Hero items={latestThree} />

      <div className="max-w-4xl px-8 py-12 md:py-16 md:px-18">
        <h2 className="text-3xl font-semibold tracking-tighter md:text-5xl">Blogs</h2>
        <p className="mt-3 text-base text-neutral-500 md:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum corrupti, eos necessitatibus omnis quas voluptatibus quis eum cum autem.</p>
      </div>

      <div className="px-6 grid gap-10 md:grid-cols-2 md:px-18 lg:grid-cols-3">
        {blogs.map((blog: any) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
}




