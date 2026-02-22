"use client";

import { Render, Data } from "@measured/puck";
import { config } from "@/lib/puck-config";

export function PuckRenderer({ data }: { data: Data }) {
  return <Render config={config} data={data} />;
}
