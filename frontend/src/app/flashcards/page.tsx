"use client";

import { useState } from "react";
import Link from "next/link";
import { FLASHCARDS_N1, Flashcard } from "@/lib/flashcardsData";
import { useI18n } from "@/lib/i18n";

export default function FlashcardsPage() {
  const { t, language } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>("TODAS");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  // Filter flashcards by category
  const filteredCards = selectedCategory === "TODAS"
    ? FLASHCARDS_N1
    : FLASHCARDS_N1.filter((c) => c.category === selectedCategory);

  const currentCard: Flashcard | undefined = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const toggleMastered = (id: string) => {
    const next = new Set(masteredIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setMasteredIds(next);
  };

  const categories = ["TODAS", "Redes", "VPN", "Hardware", "Active Directory", "Microsoft 365", "Segurança"];

  const lang = language as "pt" | "en" | "es";

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "TODAS": return t("fc_cat_all");
      case "Redes": return t("fc_cat_redes");
      case "VPN": return t("fc_cat_vpn");
      case "Hardware": return t("fc_cat_hardware");
      case "Active Directory": return t("fc_cat_ad");
      case "Microsoft 365": return t("fc_cat_m365");
      case "Segurança": return t("fc_cat_seg");
      default: return cat;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "Comando": return t("fc_type_comando");
      case "Conceito": return t("fc_type_conceito");
      case "Troubleshooting": return t("fc_type_troubleshooting");
      case "Atalho": return t("fc_type_atalho");
      case "Operação": return t("fc_type_operacao");
      default: return type;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider">
              {t("fc_badge")}
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {t("fc_level")}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">{t("fc_title")}</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t("fc_subtitle")}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/academy"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition"
          >
            <span>{t("nav_academy")}</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = cat === "TODAS"
            ? FLASHCARDS_N1.length
            : FLASHCARDS_N1.filter(c => c.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
                setShowHint(false);
              }}
              className={`px-3 py-1.5 rounded font-semibold whitespace-nowrap transition flex items-center space-x-1.5 ${
                isSelected
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              <span>{getCategoryLabel(cat)}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                isSelected ? "bg-blue-800 text-blue-200" : "bg-slate-800 text-slate-400"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress & Card Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <span>{t("fc_card_counter")} <b>{currentIndex + 1}</b> {t("fc_of")} <b>{filteredCards.length}</b></span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">{masteredIds.size} {t("fc_mastered")}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-48 bg-slate-900 rounded-full h-2 border border-slate-800 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Flashcard Card */}
      {currentCard && (
        <div className="space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`min-h-[320px] rounded-xl border p-8 flex flex-col justify-between cursor-pointer transition-all duration-200 select-none shadow-lg ${
              isFlipped
                ? "bg-[#0d1627] border-blue-500/50 hover:border-blue-400/70"
                : "bg-[#0f141f] border-slate-800 hover:border-slate-700"
            }`}
          >
            {/* Card Header Top */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                  {getCategoryLabel(currentCard.category)}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-400 font-medium">
                  {currentCard.topic[lang] || currentCard.topic.pt}
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                  {getTypeLabel(currentCard.type)}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(currentCard.id);
                }}
                className={`p-1.5 rounded border text-xs transition flex items-center space-x-1 ${
                  masteredIds.has(currentCard.id)
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : "bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300"
                }`}
                title={t("fc_mark_memorized_title")}
              >
                <span>{masteredIds.has(currentCard.id) ? t("fc_is_mastered") : t("fc_mark_mastered")}</span>
              </button>
            </div>

            {/* Card Content Area (Question vs Answer) */}
            <div className="py-6 flex flex-col justify-center">
              {!isFlipped ? (
                /* Front of Card: Question */
                <div className="space-y-4">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-blue-400 block">
                    {t("fc_question_label")}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-100 leading-snug">
                    {currentCard.question[language as 'pt' | 'en' | 'es']}
                  </h3>
                  {currentCard.hint?.[language as 'pt' | 'en' | 'es'] && showHint && (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs mt-3 flex items-start space-x-2">
                      <span className="font-bold shrink-0">{t("fc_hint_label")}</span>
                      <span>{currentCard.hint?.[language as 'pt' | 'en' | 'es']}</span>
                    </div>
                  )}
                </div>
              ) : (
                /* Back of Card: Answer */
                <div className="space-y-4 animate-in fade-in duration-200">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-400 block">
                    {t("fc_answer_label")}
                  </span>
                  <div className="text-base md:text-lg text-slate-100 leading-relaxed font-sans font-medium whitespace-pre-line">
                    {currentCard.answer[language as 'pt' | 'en' | 'es']}
                  </div>
                </div>
              )}
            </div>

            {/* Card Footer Bottom */}
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                {!isFlipped && currentCard.hint?.[language as 'pt' | 'en' | 'es'] && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowHint(!showHint);
                    }}
                    className="text-xs text-amber-400/90 hover:text-amber-300 transition underline underline-offset-4"
                  >
                    {showHint ? t("fc_hide_hint") : t("fc_hint_btn")}
                  </button>
                )}
              </div>

              <span className="italic text-[11px] text-slate-400">
                {isFlipped ? t("fc_click_to_flip_back") : t("fc_click_to_flip")}
              </span>
            </div>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={handlePrev}
              className="flex-1 py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 transition flex items-center justify-center space-x-2"
            >
              <span>{t("fc_prev_btn")}</span>
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex-1 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-sm flex items-center justify-center space-x-2"
            >
              <span>{isFlipped ? t("fc_flip_btn_hide") : t("fc_flip_btn_reveal")}</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 transition flex items-center justify-center space-x-2"
            >
              <span>{t("fc_next_btn")}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
