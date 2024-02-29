import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import InnerHeader from "./InnerHeader";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className=" h-screen">
      <body className={`${inter.className} h-full`}>
        <InnerHeader></InnerHeader>
        <Providers>
          <main className="pt-16 h-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
