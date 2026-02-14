"use client";
import { useParams } from "next/navigation";
import { PuckPage } from "@/components/PuckPage";

export default function Home() {
  const params = useParams();
  const locale = params.locale as string;

  return <PuckPage path="/" locale={locale} />;
}
