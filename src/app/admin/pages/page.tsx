"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const defaultPages = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/about", label: "About" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
  { path: "/demo", label: "Demo" },
];

export default function PagesManagement() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pages</h1>
      <p className="text-gray-500 mb-6">
        Edit pages using the Puck visual editor. Changes are saved to the database.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {defaultPages.map((page) => (
          <Card key={page.path}>
            <CardHeader>
              <CardTitle className="text-lg">{page.label}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Link href={`/editor?path=${encodeURIComponent(page.path)}`}>
                <Button size="sm">Edit in Puck</Button>
              </Link>
              <Link href={page.path} target="_blank">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" /> View
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
