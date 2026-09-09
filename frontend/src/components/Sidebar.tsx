"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import LogoIcon from "@/components/LogoIcon";

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useI18n();

  const isFundamentals = pathname === "/fundamentals" || pathname.startsWith("/fundamentals/");
  const isAcademy = pathname === "/academy" || pathname.startsWith("/academy/");
  const isFlashcards = pathname === "/flashcards" || pathname.startsWith("/flashcards/");
  const isExam = pathname === "/exam" || pathname.startsWith("/exam/");
  const isDashboard = pathname === "/";
  const isNewTicket = pathname === "/tickets/new";
  const isSettings = pathname === "/settings";

  return (
    <aside className="w-60 bg-[#0d121c] border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-full">
      <div>
        {/* Header / Brand */}
        <div className="h-14 px-4 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-center p-1 shadow-sm group-hover:border-blue-500/50 transition">
              <LogoIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-semibold text-xs text-slate-100 leading-none group-hover:text-blue-400 transition">{t("brand_title")}</h1>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{t("brand_subtitle")}</span>
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="p-3">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 py-1.5">
            {t("nav_capacitation")}
          </div>
          <nav className="space-y-0.5">
            <Link
              href="/fundamentals"
              className={`flex items-center space-x-2.5 px-3 py-2 rounded transition-colors font-semibold ${
                isFundamentals
                  ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              <svg className={`w-4 h-4 ${isFundamentals ? "text-purple-400" : "text-slate-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>{t("nav_fundamentals")}</span>
            </Link>

            <Link
              href="/academy"
              className={`flex items-center space-x-2.5 px-3 py-2 rounded transition-colors font-semibold ${
                isAcademy
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              <svg className={`w-4 h-4 ${isAcademy ? "text-blue-400" : "text-slate-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>{t("nav_academy")}</span>
            </Link>

            <Link
              href="/flashcards"
              className={`flex items-center space-x-2.5 px-3 py-2 rounded transition-colors font-semibold ${
                isFlashcards
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              <svg className={`w-4 h-4 ${isFlashcards ? "text-amber-400" : "text-slate-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>{t("nav_flashcards")}</span>
            </Link>

            <Link
              href="/exam"
              className={`flex items-center space-x-2.5 px-3 py-2 rounded transition-colors font-semibold ${
                isExam
                  ? "bg-rose-600/20 text-rose-300 border border-rose-500/30"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              <svg className={`w-4 h-4 ${isExam ? "text-rose-400" : "text-slate-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t("nav_exam")}</span>
            </Link>
          </nav>

          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 pt-4 pb-1.5">
            {t("nav_queues")}
          </div>
          <nav className="space-y-0.5">
            <Link
              href="/"
              className={`flex items-center space-x-2.5 px-3 py-2 rounded transition-colors ${
                isDashboard
                  ? "bg-slate-800 text-white font-semibold"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white font-medium"
              }`}
            >
              <svg className={`w-4 h-4 ${isDashboard ? "text-blue-400" : "text-slate-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>{t("nav_incidents")}</span>
            </Link>

            <Link
              href="/tickets/new"
              className={`flex items-center space-x-2.5 px-3 py-2 rounded transition-colors ${
                isNewTicket
                  ? "bg-slate-800 text-white font-semibold"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white font-medium"
              }`}
            >
              <svg className={`w-4 h-4 ${isNewTicket ? "text-blue-400" : "text-slate-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4v16m8-8H4" />
              </svg>
              <span>{t("nav_new_ticket")}</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* System Settings & Footer */}
      <div className="p-3 border-t border-slate-800/80">
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 pb-1.5">
          {t("nav_system")}
        </div>
        <Link
          href="/settings"
          className={`flex items-center space-x-2.5 px-3 py-2 rounded transition-colors ${
            isSettings
              ? "bg-slate-800 text-white font-semibold"
              : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 text-xs"
          }`}
        >
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{t("nav_settings")}</span>
        </Link>
      </div>
    </aside>
  );
}
