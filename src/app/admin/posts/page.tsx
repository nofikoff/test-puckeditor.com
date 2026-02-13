"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Post = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  published: boolean;
  featured: boolean;
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
  createdAt: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadPosts = async () => {
    const res = await fetch("/api/posts?limit=50");
    if (res.ok) {
      const data = await res.json();
      setPosts(data.posts);
    }
    setLoading(false);
  };

  useEffect(() => { loadPosts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Deleted", description: "Post deleted successfully" });
      loadPosts();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link href="/admin/posts/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" /> New Post
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No posts yet.{" "}
          <Link href="/admin/posts/new" className="text-blue-600 underline">
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Locale</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                    {post.featured && (
                      <Badge variant="outline" className="ml-1">Featured</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{post.locale.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>
                    {post.categories.map((c) => (
                      <Badge key={c.id} variant="secondary" className="mr-1">{c.name}</Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    {post.tags.map((t) => (
                      <Badge key={t.id} variant="outline" className="mr-1">{t.name}</Badge>
                    ))}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Link href={`/admin/posts/${post.id}`}>
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
