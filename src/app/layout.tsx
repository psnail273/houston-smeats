import type { Metadata } from "next";
import { zineFonts } from "@/components/zine/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "SMEATS | Houston's Smoked Meats",
  description: "Houston's Smoked Meats: pre-order smoked brisket for pickup in St. Louis.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={zineFonts}>
      <body>{children}</body>
    </html>
  );
}
