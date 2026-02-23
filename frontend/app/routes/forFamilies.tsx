import type { Route } from "./+types/forFamilies";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "For Families" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function ForFamilies() {
  return <Welcome />;
}