"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Tag,
  LogOut,
  PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const t = useTranslations("admin");
  const tc = useTranslations("common");

  const navItems = [
    { href: "/admin", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/admin/posts", label: t("posts"), icon: FileText },
    { href: "/admin/categories", label: t("categories"), icon: FolderOpen },
    { href: "/admin/tags", label: t("tags"), icon: Tag },
    { href: "/admin/pages", label: t("pages"), icon: PanelLeft },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4">
          <Link href="/admin" className="text-xl font-bold">
            Puck CMS
          </Link>
        </div>
        <Separator className="bg-gray-700" />
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Separator className="bg-gray-700" />
        <div className="p-4 space-y-2">
          <LocaleSwitcher />
          <div className="text-sm text-gray-400">{session?.user?.email}</div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {tc("logout")}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
