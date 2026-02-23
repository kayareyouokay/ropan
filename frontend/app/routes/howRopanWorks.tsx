import type { Route } from "./+types/howRopanWorks";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "How Ropan Works" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function HowRopanWorks() {
  return <Welcome />;
}