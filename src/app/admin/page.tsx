"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FolderOpen, Tag, Globe } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    posts: 0,
    categories: 0,
    tags: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const [postsRes, categoriesRes, tagsRes] = await Promise.all([
        fetch("/api/posts?limit=1"),
        fetch("/api/categories"),
        fetch("/api/tags"),
      ]);
      const postsData = postsRes.ok ? await postsRes.json() : { total: 0 };
      const categoriesData = categoriesRes.ok ? await categoriesRes.json() : [];
      const tagsData = tagsRes.ok ? await tagsRes.json() : [];

      setStats({
        posts: postsData.total || 0,
        categories: categoriesData.length || 0,
        tags: tagsData.length || 0,
      });
    }
    loadStats();
  }, []);

  const cards = [
    { title: "Posts", value: stats.posts, icon: FileText, href: "/admin/posts", color: "text-blue-600" },
    { title: "Categories", value: stats.categories, icon: FolderOpen, href: "/admin/categories", color: "text-green-600" },
    { title: "Tags", value: stats.tags, icon: Tag, href: "/admin/tags", color: "text-purple-600" },
    { title: "Site", value: "View", icon: Globe, href: "/", color: "text-orange-600" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{card.title}</CardTitle>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
