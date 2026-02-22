"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2, ExternalLink, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getDefaultPageData } from "@/data/demo-pages";

const DEMO_PAGES = [
  { path: "/", title: "Home" },
  { path: "/services", title: "Services" },
  { path: "/about", title: "About" },
  { path: "/blog", title: "Blog" },
  { path: "/contact", title: "Contact" },
  { path: "/demo", title: "Demo" },
];

type Page = {
  id: string;
  path: string;
  title: string;
  published: boolean;
  updatedAt: string;
};

export function PagesContent({ initialPages }: { initialPages: Page[] }) {
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [newPath, setNewPath] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const loadPages = async () => {
    try {
      const res = await fetch("/api/pages?locale=en");
      if (res.ok) setPages(await res.json());
    } catch { /* ignore */ }
  };

  const dbPaths = new Set(pages.map((p) => p.path));
  const missingDemoPages = DEMO_PAGES.filter((dp) => !dbPaths.has(dp.path));
  const allPages = [
    ...pages.map((p) => ({ ...p, inDb: true })),
    ...missingDemoPages.map((dp) => ({
      id: "",
      path: dp.path,
      title: dp.title,
      published: false,
      updatedAt: "",
      inDb: false,
    })),
  ].sort((a, b) => a.path.localeCompare(b.path));

  const handleCreate = async () => {
    const path = newPath.startsWith("/") ? newPath : `/${newPath}`;
    if (!path || path === "/") {
      toast({ title: "Error", description: "Enter a valid path", variant: "destructive" });
      return;
    }

    const res = await fetch("/api/pages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path,
        locale: "en",
        title: newTitle || path,
        data: getDefaultPageData(),
        published: false,
      }),
    });

    if (res.ok) {
      toast({ title: "Created", description: `Page "${path}" created` });
      setNewPath("");
      setNewTitle("");
      setDialogOpen(false);
      loadPages();
    } else {
      toast({ title: "Error", description: "Failed to create page", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string, path: string) => {
    if (!confirm(`Delete page "${path}"?`)) return;
    const res = await fetch(`/api/pages?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Deleted", description: `Page "${path}" deleted` });
      loadPages();
    } else {
      toast({ title: "Error", description: "Failed to delete page", variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Pages</h1>
          <p className="text-gray-500 mt-1">
            Manage pages and edit them with the Puck visual editor.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> New Page</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Page</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium">Path</label>
                <Input
                  placeholder="/pricing"
                  value={newPath}
                  onChange={(e) => setNewPath(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Pricing"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <Button onClick={handleCreate} className="w-full">Create & Open Editor</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Path</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allPages.map((page) => (
            <TableRow key={page.path}>
              <TableCell className="font-mono text-sm">{page.path}</TableCell>
              <TableCell>{page.title}</TableCell>
              <TableCell>
                {page.inDb ? (
                  page.published ? (
                    <Badge className="bg-green-100 text-green-800">Published</Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )
                ) : (
                  <Badge variant="outline">Demo</Badge>
                )}
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {page.updatedAt ? new Date(page.updatedAt).toLocaleDateString() : "\u2014"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/editor?path=${encodeURIComponent(page.path)}`}>
                    <Button size="sm" variant="outline">
                      <Pencil className="h-3 w-3 mr-1" /> Edit
                    </Button>
                  </Link>
                  <Link href={page.path} target="_blank">
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                  {page.inDb && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(page.id, page.path)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
