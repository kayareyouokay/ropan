import type { Route } from "./+types/forInvestors";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "For Investors" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function ForInvestors() {
  return <Welcome />;
}