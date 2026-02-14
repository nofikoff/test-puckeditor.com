import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Puck CMS",
  description: "Visual editor for React with CMS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="antialiased">{children}</body>
    </html>
  );
}
