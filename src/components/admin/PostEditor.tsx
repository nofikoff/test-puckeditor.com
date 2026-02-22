"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { TipTapFieldEditor } from "@/components/puck-components/TipTapEditor";
import { htmlToMarkdown } from "@/lib/markdown";
import { ArrowLeft, Save, Eye, EyeOff, Star } from "lucide-react";

type Category = { id: string; slug: string; name: string };
type Tag = { id: string; slug: string; name: string };

type InitialPost = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  featured: boolean;
  categoryIds: string[];
  tagIds: string[];
};

export function PostEditor({
  postId,
  initialPost,
  initialEditorHtml,
  initialCategories,
  initialTags,
}: {
  postId?: string;
  initialPost?: InitialPost;
  initialEditorHtml?: string;
  initialCategories?: Category[];
  initialTags?: Tag[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const isEditing = !!postId;

  const [saving, setSaving] = useState(false);
  const [categories] = useState<Category[]>(initialCategories ?? []);
  const [tags] = useState<Tag[]>(initialTags ?? []);

  const [form, setForm] = useState({
    slug: initialPost?.slug ?? "",
    locale: initialPost?.locale ?? "en",
    title: initialPost?.title ?? "",
    excerpt: initialPost?.excerpt ?? "",
    content: initialPost?.content ?? "",
    coverImage: initialPost?.coverImage ?? "",
    published: initialPost?.published ?? false,
    featured: initialPost?.featured ?? false,
    categoryIds: initialPost?.categoryIds ?? ([] as string[]),
    tagIds: initialPost?.tagIds ?? ([] as string[]),
  });

  const [editorHtml, setEditorHtml] = useState(initialEditorHtml ?? "");

  const handleEditorChange = (html: string) => {
    setEditorHtml(html);
    setForm((prev) => ({ ...prev, content: htmlToMarkdown(html) }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast({ title: "Error", description: "Title and slug are required", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      const url = isEditing ? `/api/posts/${postId}` : "/api/posts";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast({ title: "Saved", description: `Post ${isEditing ? "updated" : "created"} successfully` });
        if (!isEditing) {
          const post = await res.json();
          router.push(`/admin/posts/${post.id}`);
        }
      } else {
        const err = await res.json();
        toast({ title: "Error", description: err.error || "Failed to save", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    }
    setSaving(false);
  };

  const toggleCategory = (id: string) => {
    setForm((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(id)
        ? prev.categoryIds.filter((c) => c !== id)
        : [...prev.categoryIds, id],
    }));
  };

  const toggleTag = (id: string) => {
    setForm((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(id)
        ? prev.tagIds.filter((t) => t !== id)
        : [...prev.tagIds, id],
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/admin/posts")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-bold">{isEditing ? "Edit Post" : "New Post"}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setForm((p) => ({ ...p, published: !p.published }))}
          >
            {form.published ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {form.published ? "Unpublish" : "Publish"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setForm((p) => ({ ...p, featured: !p.featured }))}
          >
            <Star className={`h-4 w-4 mr-2 ${form.featured ? "fill-yellow-500 text-yellow-500" : ""}`} />
            {form.featured ? "Unfeatured" : "Featured"}
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm((p) => ({
                      ...p,
                      title,
                      slug: isEditing ? p.slug : generateSlug(title),
                    }));
                  }}
                  placeholder="Post title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                  placeholder="post-slug"
                />
              </div>
              <div className="space-y-2">
                <Label>Body (Markdown WYSIWYG)</Label>
                <TipTapFieldEditor value={editorHtml} onChange={handleEditorChange} />
                <p className="text-xs text-gray-500">
                  Content is stored as Markdown in the database
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Excerpt</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={form.excerpt}
                onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                placeholder="Brief description of the post"
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select
                  value={form.locale}
                  onValueChange={(v) => setForm((p) => ({ ...p, locale: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="sr">Serbian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  value={form.coverImage}
                  onChange={(e) => setForm((p) => ({ ...p, coverImage: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              {categories.length === 0 ? (
                <p className="text-sm text-gray-500">No categories yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Badge
                      key={cat.id}
                      variant={form.categoryIds.includes(cat.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleCategory(cat.id)}
                    >
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              {tags.length === 0 ? (
                <p className="text-sm text-gray-500">No tags yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant={form.tagIds.includes(tag.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag.id)}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
