import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description:
    "Discover and buy unique handcrafted products directly from talented artisans. Artisan Connect is a vibrant platform where artisans showcase their works, and craft lovers can explore, interact, and shop for one-of-a-kind handmade creations.",
  keywords: [
    "handmade",
    "artisan marketplace",
    "crafts",
    "handcrafted products",
    "unique gifts",
    "artisans",
    "handmade shopping",
    "support local artists",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
