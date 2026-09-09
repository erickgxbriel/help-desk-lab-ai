"use client";

import { useI18n, Language } from "@/lib/i18n";

export default function LanguageSelector() {
  const { language, setLanguage } = useI18n();

  const flags: Record<Language, { label: string; icon: string }> = {
    pt: { label: "PT", icon: "🇧🇷" },
    en: { label: "EN", icon: "🇺🇸" },
    es: { label: "ES", icon: "🇪🇸" },
  };

  return (
    <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-semibold">
      {(["pt", "en", "es"] as Language[]).map((lang) => {
        const isSelected = language === lang;
        return (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-2 py-1 rounded transition flex items-center space-x-1 ${
              isSelected
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title={flags[lang].label}
          >
            <span>{flags[lang].icon}</span>
            <span className="text-[11px] uppercase">{lang}</span>
          </button>
        );
      })}
    </div>
  );
}
