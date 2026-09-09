"use client";

import LanguageSelector from "@/components/LanguageSelector";
import { useI18n } from "@/lib/i18n";

export default function TopHeader() {
  const { t } = useI18n();

  return (
    <header className="h-14 border-b border-slate-800/80 px-6 flex items-center justify-between shrink-0 bg-[#0f141f]">
      <div className="flex items-center space-x-3">
        <span className="text-xs font-semibold text-slate-300">IT Service Management</span>
        <span className="text-slate-600">/</span>
        <span className="text-xs text-slate-400">{t("top_bar_title")}</span>
      </div>
      <div className="flex items-center space-x-3">
        {/* Language Switcher */}
        <LanguageSelector />

        <div className="flex items-center space-x-1.5 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>{t("status_online")}</span>
        </div>
      </div>
    </header>
  );
}
