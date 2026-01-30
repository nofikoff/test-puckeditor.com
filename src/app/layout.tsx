import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Puck Editor Demo",
  description: "Visual editor for React - Demo Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
