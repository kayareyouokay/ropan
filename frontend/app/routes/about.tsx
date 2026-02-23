import type { Route } from "./+types/about";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
  return <Welcome />;
}