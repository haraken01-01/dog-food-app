import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "犬の食事量・トッピング支援",
  description: "健康な成犬向けの食事量と手作りトッピングの目安計算ツール"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
