import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ServiceDesk Lab | Incident Management Platform",
  description: "IT Support N1/N2 Simulation and Training Environment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full dark`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="h-full flex text-slate-100 antialiased overflow-hidden text-[13px]" suppressHydrationWarning>
        <I18nProvider>
          {/* Interactive ITSM Sidebar */}
          <Sidebar />

          {/* Content Area */}
          <div className="flex-1 flex flex-col bg-[#0b0f17] overflow-hidden">
            {/* Top ITSM App Bar */}
            <TopHeader />

            {/* View Container */}
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
