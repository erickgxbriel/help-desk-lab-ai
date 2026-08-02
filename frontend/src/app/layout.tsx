import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Help Desk Lab AI",
  description: "IT Support N1/N2 Simulator with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="h-full flex text-slate-100 antialiased overflow-hidden">
        {/* Main Sidebar */}
        <aside className="w-64 bg-slate-950/80 border-r border-slate-800 flex flex-col justify-between shrink-0">
          <div>
            {/* Header / Brand */}
            <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-lg text-white shadow-md shadow-indigo-500/20">
                H
              </div>
              <div>
                <h1 className="font-bold text-sm tracking-wide text-white leading-none">HELP DESK LAB</h1>
                <span className="text-[10px] font-semibold uppercase text-indigo-400 tracking-wider">AI Simulator</span>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="p-4 space-y-1">
              <Link
                href="/"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                </svg>
                <span>Dashboard</span>
              </Link>

              <Link
                href="/tickets/new"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Novo Chamado</span>
              </Link>

              <Link
                href="/settings"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Configurações</span>
              </Link>
            </nav>
          </div>

          {/* Footer inside sidebar */}
          <div className="p-4 border-t border-slate-900 bg-slate-950/40">
            <div className="flex items-center space-x-2 text-[11px] text-slate-500">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>Modo Local / Host</span>
            </div>
            <div className="mt-1 text-[10px] text-slate-600">
              v1.0.0 (TryHackMe N1)
            </div>
          </div>
        </aside>

        {/* Content Wrapper */}
        <main className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
          {/* Subtle top bar for search/status */}
          <header className="h-16 border-b border-slate-900 px-8 flex items-center justify-between shrink-0 bg-slate-900/10 backdrop-blur-md z-10">
            <div className="text-sm font-semibold text-slate-400">
              Lab de Treinamento Service Desk
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                Status: Pronto
              </span>
            </div>
          </header>

          {/* Page contents container */}
          <div className="flex-1 overflow-y-auto p-8 relative">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
