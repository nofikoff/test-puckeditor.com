"use client";
import { useParams } from "next/navigation";
import { PuckPage } from "@/components/PuckPage";

export default function DynamicPuckPage() {
  const params = useParams();
  const segments = params.puckPath as string[];
  const locale = params.locale as string;
  const path = "/" + segments.join("/");

  return <PuckPage path={path} locale={locale} />;
}
