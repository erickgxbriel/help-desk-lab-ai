"use client";

import { useState } from "react";
import Link from "next/link";
import { TICKET_KNOWLEDGE } from "@/lib/ticketKnowledge";
import { useI18n } from "@/lib/i18n";

const ACADEMY_MODULES = [
  {
    id: "networks",
    titleKey: "acad_module_1_title",
    descKey: "acad_module_1_desc",
    icon: "🌐",
    ticketIds: ["HD-1013", "HD-1016", "HD-1003", "HD-1009", "HD-1034", "HD-1035", "HD-1037", "HD-1014", "HD-1033", "HD-1036", "HD-1029", "HD-1010"]
  },
  {
    id: "hardware-windows",
    titleKey: "acad_module_2_title",
    descKey: "acad_module_2_desc",
    icon: "💻",
    ticketIds: ["HD-1032", "HD-1031", "HD-1011", "HD-1012", "HD-1002", "HD-1026", "HD-1015", "HD-1007", "HD-1027"]
  },
  {
    id: "active-directory",
    titleKey: "acad_module_3_title",
    descKey: "acad_module_3_desc",
    icon: "🏢",
    ticketIds: ["HD-1005", "HD-1038", "HD-1039", "HD-1040", "HD-1041", "HD-1042", "HD-1008", "HD-1017", "HD-1030", "HD-1028"]
  },
  {
    id: "m365-collab",
    titleKey: "acad_module_4_title",
    descKey: "acad_module_4_desc",
    icon: "☁️",
    ticketIds: ["HD-1020", "HD-1001", "HD-1019", "HD-1004", "HD-1006"]
  },
  {
    id: "security-intune",
    titleKey: "acad_module_5_title",
    descKey: "acad_module_5_desc",
    icon: "🛡️",
    ticketIds: ["HD-1021", "HD-1023", "HD-1018", "HD-1022", "HD-1024", "HD-1025"]
  }
];

export default function AcademyPage() {
  const { t, language } = useI18n();
  const lang = language as "pt" | "en" | "es";
  const [selectedModule, setSelectedModule] = useState(ACADEMY_MODULES[0].id);
  const [levelFilter, setLevelFilter] = useState<"ALL" | "N1" | "N2">("ALL");

  const currentModule = ACADEMY_MODULES.find((m) => m.id === selectedModule) || ACADEMY_MODULES[0];

  // Helper to sort: N1 first, then N2, then DESAFIO
  const sortedTicketIds = [...currentModule.ticketIds].sort((a, b) => {
    const levelA = TICKET_KNOWLEDGE[a]?.level || "N1";
    const levelB = TICKET_KNOWLEDGE[b]?.level || "N1";
    const priorityOrder: Record<string, number> = { "N1": 1, "N2": 2, "DESAFIO": 3 };
    return (priorityOrder[levelA] || 99) - (priorityOrder[levelB] || 99);
  });

  const filteredTicketIds = sortedTicketIds.filter((tid) => {
    if (levelFilter === "ALL") return true;
    return TICKET_KNOWLEDGE[tid]?.level === levelFilter;
  });

  const [selectedTicketId, setSelectedTicketId] = useState<string>(sortedTicketIds[0]);

  const currentKnowledge = TICKET_KNOWLEDGE[selectedTicketId] || TICKET_KNOWLEDGE[sortedTicketIds[0]] || TICKET_KNOWLEDGE["HD-1013"];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Academy Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider">
              {t("acad_badge")}
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {t("acad_focus_badge")}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">{t("acad_title")}</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t("acad_subtitle")}
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded border border-slate-800 transition shadow-xs"
        >
          <span>{t("nav_incidents")}</span>
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* Module Selector Tabs (5 Trilhas) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {ACADEMY_MODULES.map((mod) => {
          const isSelected = mod.id === selectedModule;
          const n1Count = mod.ticketIds.filter(tid => TICKET_KNOWLEDGE[tid]?.level === "N1").length;
          const n2Count = mod.ticketIds.filter(tid => TICKET_KNOWLEDGE[tid]?.level === "N2" || TICKET_KNOWLEDGE[tid]?.level === "DESAFIO").length;

          return (
            <button
              key={mod.id}
              onClick={() => {
                setSelectedModule(mod.id);
                const firstId = mod.ticketIds[0];
                setSelectedTicketId(firstId);
              }}
              className={`p-3.5 rounded text-left border transition flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-900/90 border-blue-500/60 shadow-xs"
                  : "bg-[#0f141f] border-slate-800/80 hover:border-slate-700 text-slate-400"
              }`}
            >
              <div className="flex items-center space-x-2 mb-1.5">
                <span className="text-lg">{mod.icon}</span>
                <span className={`text-xs font-bold truncate ${isSelected ? "text-blue-400" : "text-slate-200"}`}>
                  {t(mod.titleKey)}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {t(mod.descKey)}
              </p>
              <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
                <span className="flex items-center space-x-1.5">
                  <span className="text-emerald-400 font-semibold">{n1Count} N1</span>
                  <span>•</span>
                  <span className="text-amber-400 font-semibold">{n2Count} N2</span>
                </span>
                <span className="font-semibold text-slate-400">{isSelected ? t("acad_tab_active") : t("acad_tab_explore")}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Level Filter Bar */}
      <div className="flex items-center justify-between bg-[#0f141f] p-2.5 rounded border border-slate-800/80">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setLevelFilter("ALL")}
            className={`px-3 py-1 rounded text-xs font-semibold transition ${
              levelFilter === "ALL"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-900 text-slate-400 hover:text-slate-200"
            }`}
          >
            {t("acad_filter_all")} ({currentModule.ticketIds.length})
          </button>
          <button
            onClick={() => setLevelFilter("N1")}
            className={`px-3 py-1 rounded text-xs font-semibold transition flex items-center space-x-1 ${
              levelFilter === "N1"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-slate-900 text-emerald-400 hover:bg-slate-800"
            }`}
          >
            <span>{t("acad_filter_n1")}</span>
            <span className="text-[10px] bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500/30">
              {currentModule.ticketIds.filter(tid => TICKET_KNOWLEDGE[tid]?.level === "N1").length}
            </span>
          </button>
          <button
            onClick={() => setLevelFilter("N2")}
            className={`px-3 py-1 rounded text-xs font-semibold transition flex items-center space-x-1 ${
              levelFilter === "N2"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-slate-900 text-amber-400 hover:bg-slate-800"
            }`}
          >
            <span>{t("acad_filter_n2")}</span>
            <span className="text-[10px] bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-500/30">
              {currentModule.ticketIds.filter(tid => TICKET_KNOWLEDGE[tid]?.level === "N2" || TICKET_KNOWLEDGE[tid]?.level === "DESAFIO").length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Split: Topics Navigation (Left) + Detailed Guided Lesson & Lab Launcher (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Topics List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-1 flex items-center justify-between">
            <span>{t("acad_labs_title")} ({filteredTicketIds.length})</span>
          </div>

          <div className="space-y-2">
            {filteredTicketIds.map((tid) => {
              const know = TICKET_KNOWLEDGE[tid];
              if (!know) return null;
              const isTopicSelected = tid === selectedTicketId;

              return (
                <div
                  key={tid}
                  onClick={() => setSelectedTicketId(tid)}
                  className={`p-3 rounded border cursor-pointer transition ${
                    isTopicSelected
                      ? "bg-slate-900 border-blue-500/60 shadow-xs"
                      : "bg-[#0f141f] border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        know.level === "N1" ? "bg-emerald-400" :
                        know.level === "N2" ? "bg-amber-400" : "bg-rose-400"
                      }`}></span>
                      <h4 className={`text-xs font-semibold ${isTopicSelected ? "text-blue-400" : "text-slate-200"}`}>
                        {know.title[lang] || know.title.pt}
                      </h4>
                    </div>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold shrink-0 ${
                      know.level === "N1" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      know.level === "N2" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                      "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}>
                      {know.level}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 pl-3">
                    {know.whatIsHappening[lang]}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500 pl-3">
                    <span className="font-mono text-blue-400/80">Ref: {tid}</span>
                    <span>{know.category[lang] || know.category.pt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Guided Lesson & Interactive Lab Launcher */}
        <div className="lg:col-span-8 bg-[#0f141f] border border-slate-800/80 rounded p-5 space-y-5">
          {/* Header of Selected Topic */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center space-x-2 text-[10px] text-slate-500 uppercase font-semibold mb-1">
                <span>{t(currentModule.titleKey)}</span>
                <span>•</span>
                <span className={`font-bold ${
                  currentKnowledge.level === "N1" ? "text-emerald-400" :
                  currentKnowledge.level === "N2" ? "text-amber-400" : "text-rose-400"
                }`}>
                  {t("dash_level_prefix")} {currentKnowledge.level} {currentKnowledge.level === "N1" ? `(${t("acad_beginner")})` : `(${t("acad_intermediate")})`}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-100">{currentKnowledge.title[lang] || currentKnowledge.title.pt}</h3>
            </div>

            <Link
              href={`/tickets/${selectedTicketId}`}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded shadow-sm transition shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t("acad_start_lab")} ({selectedTicketId})</span>
            </Link>
          </div>

          {/* Section 1: O que está acontecendo? */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
              <span className="text-blue-400">🔍</span>
              <span>{t("acad_section1_title")}</span>
            </h4>
            <div className="bg-slate-950/60 p-3.5 rounded border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <p>{currentKnowledge.whatIsHappening[lang]}</p>
            </div>
          </div>

          {/* Section 2: Como Conduzir o Atendimento no Chat */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
              <span className="text-amber-400">💬</span>
              <span>{t("acad_section2_title")}</span>
            </h4>
            <div className="bg-slate-950/60 rounded border border-slate-800 p-3.5 space-y-2 text-xs">
              <ul className="space-y-1.5 text-slate-300 list-disc pl-3.5 leading-relaxed">
                {currentKnowledge.investigationSteps[lang].map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
              <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded mt-2">
                <span className="text-[10px] font-bold uppercase text-amber-400 block mb-0.5">{t("acad_golden_question_label")}</span>
                <span className="italic text-slate-200">"{currentKnowledge.goldenQuestion[lang]}"</span>
              </div>
            </div>
          </div>

          {/* Section 3: Como Resolver na Prática */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
              <span className="text-emerald-400">🛠️</span>
              <span>{t("acad_section3_title")}</span>
            </h4>
            <div className="bg-slate-950/60 p-3.5 rounded border border-slate-800 space-y-3 text-xs">
              <p className="text-slate-300 leading-relaxed">{currentKnowledge.howToSolve[lang]}</p>
              {currentKnowledge.commandsCheatSheet.length > 0 && (
                <div className="space-y-1.5 border-t border-slate-800/60 pt-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">{t("acad_commands_label")}</span>
                  {currentKnowledge.commandsCheatSheet.map((item, idx) => (
                    <div key={idx} className="p-2 bg-slate-900 rounded border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <code className="px-2 py-0.5 bg-slate-950 rounded text-amber-300 font-mono text-[11px] border border-slate-800 w-fit">
                        {item.cmd}
                      </code>
                      <span className="text-slate-400 text-[11px]">{item.desc[lang]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
