import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("how-ropan-works", "routes/howRopanWorks.tsx"),
    route("for-families", "routes/forFamilies.tsx"),
    route("for-investors", "routes/forInvestors.tsx"),
    route("team-and-advisors", "routes/teamAndAdvisors.tsx"),
    route("blogs", "routes/blogs.tsx"),
    route("blog/:slug", "routes/blog.$slug.tsx"),
    route("contact", "routes/contact.tsx")

] satisfies RouteConfig;

