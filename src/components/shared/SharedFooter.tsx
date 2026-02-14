"use client";
import { Link, usePathname } from "@/i18n/navigation";

export function SharedFooter() {
  const pathname = usePathname();

  if (pathname === "/editor") {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Puck Editor</h3>
            <p className="text-gray-400">
              The visual editor for React. Build beautiful pages without writing code.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/demo" className="hover:text-white transition">Demo</Link></li>
              <li><Link href="/editor" className="hover:text-white transition">Editor</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="https://puckeditor.com/docs" className="hover:text-white transition">Documentation</a></li>
              <li><a href="https://github.com/puckeditor/puck" className="hover:text-white transition">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">© 2024 Puck Editor Demo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
