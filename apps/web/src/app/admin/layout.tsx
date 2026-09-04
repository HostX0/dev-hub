import type { Metadata, Viewport } from "next";
import { fontVars } from "@/app/fonts";
import { AdminShell } from "@/components/admin/AdminShell";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: { default: "لوحة تحكم Dev Hub", template: "%s · لوحة تحكم Dev Hub" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#06060a",
  colorScheme: "dark",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth" className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
