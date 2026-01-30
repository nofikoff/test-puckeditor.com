"use client";
import { Render } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from "@/lib/puck-config";
import { getPage } from "@/data/demo-pages";

export default function AboutPage() {
  const data = getPage("/about");
  return <Render config={config} data={data as any} />;
}
