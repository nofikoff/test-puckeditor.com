import { Metadata } from "next";
import { Data } from "@measured/puck";
import { notFound } from "next/navigation";
import { PuckRenderer } from "@/components/PuckRenderer";
import { getPageByPath } from "@/lib/data";
import { getPage } from "@/data/demo-pages";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; puckPath: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, puckPath } = await params;
  const path = "/" + puckPath.join("/");
  const dbPage = await getPageByPath(path, locale);
  const title = dbPage?.title || puckPath[puckPath.length - 1] || "Page";
  return { title };
}

export default async function DynamicPuckPage({ params }: Props) {
  const { locale, puckPath } = await params;
  const path = "/" + puckPath.join("/");

  const dbPage = await getPageByPath(path, locale);
  const data = (dbPage?.data as Data) ?? (getPage(path) as Data);

  if (!data) {
    notFound();
  }

  return <PuckRenderer data={data} />;
}
