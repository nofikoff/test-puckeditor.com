"use client";
import { useEffect, useState } from "react";
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
import { htmlToMarkdown, markdownToHtml } from "@/lib/markdown";
import { ArrowLeft, Save, Eye, EyeOff, Star } from "lucide-react";

type Category = { id: string; slug: string; name: string };
type Tag = { id: string; slug: string; name: string };

export function PostEditor({ postId }: { postId?: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const isEditing = !!postId;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [form, setForm] = useState({
    slug: "",
    locale: "en",
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    published: false,
    featured: false,
    categoryIds: [] as string[],
    tagIds: [] as string[],
  });

  // HTML content for TipTap editor (converted from markdown)
  const [editorHtml, setEditorHtml] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/tags").then((r) => r.json()),
    ]).then(([cats, tgs]) => {
      setCategories(cats || []);
      setTags(tgs || []);
    });
  }, []);

  useEffect(() => {
    if (!postId) return;
    fetch(`/api/posts/${postId}`)
      .then((r) => r.json())
      .then((post) => {
        setForm({
          slug: post.slug,
          locale: post.locale,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
          published: post.published,
          featured: post.featured,
          categoryIds: post.categories.map((c: Category) => c.id),
          tagIds: post.tags.map((t: Tag) => t.id),
        });
        // Convert stored markdown to HTML for TipTap
        setEditorHtml(markdownToHtml(post.content));
        setLoading(false);
      });
  }, [postId]);

  const handleEditorChange = (html: string) => {
    setEditorHtml(html);
    // Convert HTML from TipTap to markdown for storage
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

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading...</div>;
  }

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
        {/* Main content */}
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

        {/* Sidebar */}
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
