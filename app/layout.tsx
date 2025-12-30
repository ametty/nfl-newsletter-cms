import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gridiron Unfiltered - NFL Newsletter",
  description: "Raw, unfiltered NFL takes. No corporate BS.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
