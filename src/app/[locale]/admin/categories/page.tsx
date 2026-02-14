"use client";
import { useEffect, useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Category = {
  id: string;
  slug: string;
  locale: string;
  name: string;
  _count: { posts: number };
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [locale, setLocale] = useState("en");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadCategories = async () => {
    const res = await fetch(`/api/categories?locale=${locale}`);
    if (res.ok) setCategories(await res.json());
    setLoading(false);
  };

  useEffect(() => { loadCategories(); }, [locale]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Deleted", description: "Category deleted" });
      loadCategories();
    } else {
      toast({ title: "Error", description: "Failed to delete category", variant: "destructive" });
    }
  };

  const handleCreate = async () => {
    if (!name.trim()) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, name: name.trim(), locale }),
    });
    if (res.ok) {
      toast({ title: "Created", description: "Category created" });
      setName("");
      loadCategories();
    } else {
      toast({ title: "Error", description: "Failed to create category", variant: "destructive" });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category name"
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
            </div>
            <Select value={locale} onValueChange={setLocale}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="sr">Serbian</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Locale</TableHead>
                <TableHead>Posts</TableHead>
                <TableHead className="w-16">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell className="text-gray-500">{cat.slug}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{cat.locale.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>{cat._count.posts}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(cat.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No categories yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
