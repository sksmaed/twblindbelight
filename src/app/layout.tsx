import type { Metadata } from "next";
import "./globals.css";
import { MusicProvider } from "@/utils/music";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "微光季 音聲展覽",
  description: "這次讓我們一起，閉上雙眼，看見更多。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: "var(--font-noto-serif)" }}>
        <Suspense fallback={<div>Loading...</div>}>
          <MusicProvider>
            {children}
          </MusicProvider>
        </Suspense>
      </body>
    </html>
  );
}
