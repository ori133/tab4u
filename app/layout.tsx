import type { Metadata } from "next";
import "@fontsource/heebo/300.css";
import "@fontsource/heebo/400.css";
import "@fontsource/heebo/500.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "אקורדים לשיר לב לבן - שולי רנד | Tab4U (דוגמת עיצוב)",
  description: "הצעת עיצוב מחדש לדף שיר באתר Tab4U",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
