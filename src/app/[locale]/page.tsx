import { Metadata } from "next";
import { Data } from "@measured/puck";
import { PuckRenderer } from "@/components/PuckRenderer";
import { getPageByPath } from "@/lib/data";
import { getPage } from "@/data/demo-pages";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dbPage = await getPageByPath("/", locale);
  const title = dbPage?.title || "Home";
  return { title };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  const dbPage = await getPageByPath("/", locale);
  const data = (dbPage?.data as Data) ?? (getPage("/") as Data);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-8">Page not found</p>
      </div>
    );
  }

  return <PuckRenderer data={data} />;
}
