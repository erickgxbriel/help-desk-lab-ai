"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function FundamentalsPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"compTIA" | "itil" | "softskills" | "checklist">("compTIA");

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider">
              {t("fund_badge")}
            </span>
            <span className="text-[10px] text-amber-400 font-mono font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              {t("fund_cert_badge")}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">{t("fund_title")}</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t("fund_subtitle")}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/academy"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-xs"
          >
            <span>{t("nav_academy")}</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab("compTIA")}
          className={`px-3 py-2 rounded-lg font-semibold transition flex items-center space-x-2 whitespace-nowrap ${
            activeTab === "compTIA"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
          }`}
        >
          <span>{t("fund_tab_comptia")}</span>
        </button>

        <button
          onClick={() => setActiveTab("itil")}
          className={`px-3 py-2 rounded-lg font-semibold transition flex items-center space-x-2 whitespace-nowrap ${
            activeTab === "itil"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
          }`}
        >
          <span>{t("fund_tab_itil")}</span>
        </button>

        <button
          onClick={() => setActiveTab("softskills")}
          className={`px-3 py-2 rounded-lg font-semibold transition flex items-center space-x-2 whitespace-nowrap ${
            activeTab === "softskills"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
          }`}
        >
          <span>{t("fund_tab_softskills")}</span>
        </button>

        <button
          onClick={() => setActiveTab("checklist")}
          className={`px-3 py-2 rounded-lg font-semibold transition flex items-center space-x-2 whitespace-nowrap ${
            activeTab === "checklist"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
          }`}
        >
          <span>{t("fund_tab_checklist")}</span>
        </button>
      </div>

      {/* Tab Content 1: CompTIA 6 Steps */}
      {activeTab === "compTIA" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-[#0f141f] border border-blue-900/40 rounded-xl p-5">
            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">
              {t("fund_formula_title")}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t("fund_formula_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Step 1 */}
            <div className="bg-[#0f141f] border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center font-mono font-bold text-xs border border-blue-500/30">1</span>
                <h4 className="text-xs font-bold text-slate-100">{t("fund_step1_title")}</h4>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-5 leading-relaxed">
                <li>{t("fund_step1_b1")}</li>
                <li>{t("fund_step1_b2")}</li>
                <li>{t("fund_step1_b3")}</li>
                <li>{t("fund_step1_b4")}</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0f141f] border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center font-mono font-bold text-xs border border-blue-500/30">2</span>
                <h4 className="text-xs font-bold text-slate-100">{t("fund_step2_title")}</h4>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-5 leading-relaxed">
                <li>{t("fund_step2_b1")}</li>
                <li>{t("fund_step2_b2")}</li>
                <li>{t("fund_step2_b3")}</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0f141f] border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center font-mono font-bold text-xs border border-blue-500/30">3</span>
                <h4 className="text-xs font-bold text-slate-100">{t("fund_step3_title")}</h4>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-5 leading-relaxed">
                <li>{t("fund_step3_b1")}</li>
                <li><strong className="text-amber-300">{t("fund_step3_b2")}</strong></li>
                <li><strong className="text-rose-400">{t("fund_step3_b3")}</strong></li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="bg-[#0f141f] border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center font-mono font-bold text-xs border border-blue-500/30">4</span>
                <h4 className="text-xs font-bold text-slate-100">{t("fund_step4_title")}</h4>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-5 leading-relaxed">
                <li>{t("fund_step4_b1")}</li>
                <li>{t("fund_step4_b2")}</li>
                <li>{t("fund_step4_b3")}</li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="bg-[#0f141f] border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center font-mono font-bold text-xs border border-blue-500/30">5</span>
                <h4 className="text-xs font-bold text-slate-100">{t("fund_step5_title")}</h4>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-5 leading-relaxed">
                <li>{t("fund_step5_b1")}</li>
                <li>{t("fund_step5_b2")}</li>
              </ul>
            </div>

            {/* Step 6 */}
            <div className="bg-[#0f141f] border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center font-mono font-bold text-xs border border-blue-500/30">6</span>
                <h4 className="text-xs font-bold text-slate-100">{t("fund_step6_title")}</h4>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-5 leading-relaxed">
                <li>{t("fund_step6_b1")}</li>
                <li>{t("fund_step6_b2")}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: ITIL 4 */}
      {activeTab === "itil" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-[#0f141f] border border-purple-900/40 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider">
              {t("fund_itil_title")}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t("fund_itil_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0f141f] border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs">
                <span>{t("fund_itil_inc_title")}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t("fund_itil_inc_desc")}
              </p>
            </div>

            <div className="bg-[#0f141f] border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs">
                <span>{t("fund_itil_req_title")}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t("fund_itil_req_desc")}
              </p>
            </div>

            <div className="bg-[#0f141f] border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                <span>{t("fund_itil_prob_title")}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t("fund_itil_prob_desc")}
              </p>
            </div>

            <div className="bg-[#0f141f] border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                <span>{t("fund_itil_sla_title")}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t("fund_itil_sla_desc")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Soft Skills */}
      {activeTab === "softskills" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-[#0f141f] border border-amber-900/40 rounded-xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
              {t("fund_soft_title")}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t("fund_soft_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0f141f] border border-slate-800 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-rose-400">{t("fund_soft_u1_title")}</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {t("fund_soft_u1_desc")}
              </p>
              <div className="p-2 bg-slate-950 rounded text-[11px] text-emerald-300 italic border border-slate-800">
                {t("fund_soft_u1_quote")}
              </div>
            </div>

            <div className="bg-[#0f141f] border border-slate-800 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-amber-400">{t("fund_soft_u2_title")}</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {t("fund_soft_u2_desc")}
              </p>
              <div className="p-2 bg-slate-950 rounded text-[11px] text-emerald-300 italic border border-slate-800">
                {t("fund_soft_u2_quote")}
              </div>
            </div>

            <div className="bg-[#0f141f] border border-slate-800 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-blue-400">{t("fund_soft_u3_title")}</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {t("fund_soft_u3_desc")}
              </p>
              <div className="p-2 bg-slate-950 rounded text-[11px] text-emerald-300 italic border border-slate-800">
                {t("fund_soft_u3_quote")}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 4: Checklist N1 */}
      {activeTab === "checklist" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-[#0f141f] border border-emerald-900/40 rounded-xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
              {t("fund_chk_title")}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t("fund_chk_desc")}
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-[#0f141f] border border-slate-800 rounded-xl flex items-start space-x-3">
              <span className="text-emerald-400 font-bold text-base">✓</span>
              <p className="text-xs text-slate-300 leading-relaxed">{t("fund_chk_1")}</p>
            </div>

            <div className="p-3 bg-[#0f141f] border border-slate-800 rounded-xl flex items-start space-x-3">
              <span className="text-emerald-400 font-bold text-base">✓</span>
              <p className="text-xs text-slate-300 leading-relaxed">{t("fund_chk_2")}</p>
            </div>

            <div className="p-3 bg-[#0f141f] border border-slate-800 rounded-xl flex items-start space-x-3">
              <span className="text-emerald-400 font-bold text-base">✓</span>
              <p className="text-xs text-slate-300 leading-relaxed">{t("fund_chk_3")}</p>
            </div>

            <div className="p-3 bg-[#0f141f] border border-slate-800 rounded-xl flex items-start space-x-3">
              <span className="text-emerald-400 font-bold text-base">✓</span>
              <p className="text-xs text-slate-300 leading-relaxed">{t("fund_chk_4")}</p>
            </div>

            <div className="p-3 bg-[#0f141f] border border-slate-800 rounded-xl flex items-start space-x-3">
              <span className="text-emerald-400 font-bold text-base">✓</span>
              <p className="text-xs text-slate-300 leading-relaxed">{t("fund_chk_5")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
