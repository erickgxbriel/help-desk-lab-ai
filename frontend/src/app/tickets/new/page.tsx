"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

export default function NewTicket() {
  const router = useRouter();
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [priority, setPriority] = useState("");

  const categories = [
    "Impressora", "Outlook / E-mail", "Windows", "Teams", "VPN", "Wi-Fi", 
    "Senha / Acesso", "OneDrive", "Rede básica", "Linux básico", 
    "Active Directory básico", "Segurança básica", "Software corporativo",
    "Erro de login", "Permissões", "Sistema lento", "Chamado genérico de suporte"
  ];

  const difficulties = [
    { value: "N1", label: t("new_ticket_diff_n1") },
    { value: "N2", label: t("new_ticket_diff_n2") },
    { value: "DESAFIO", label: t("new_ticket_diff_challenge") }
  ];

  const profiles = [
    { value: "LEIGO", label: t("new_ticket_prof_leigo") },
    { value: "APRESSADO", label: t("new_ticket_prof_apressado") },
    { value: "CONFUSO", label: t("new_ticket_prof_confuso") },
    { value: "GESTOR", label: t("new_ticket_prof_gestor") },
    { value: "DIRETOR", label: t("new_ticket_prof_diretor") },
    { value: "RH", label: t("new_ticket_prof_rh") },
    { value: "FINANCEIRO", label: t("new_ticket_prof_financeiro") },
    { value: "TECNICO", label: t("new_ticket_prof_tecnico") },
    { value: "ANSIOSO", label: t("new_ticket_prof_ansioso") }
  ];

  const priorities = [
    { value: "LOW", label: t("new_ticket_prio_low") },
    { value: "MEDIUM", label: t("new_ticket_prio_med") },
    { value: "HIGH", label: t("new_ticket_prio_high") },
    { value: "CRITICAL", label: t("new_ticket_prio_crit") }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      category: category || undefined,
      difficulty: difficulty || undefined,
      user_profile: userProfile || undefined,
      priority: priority || undefined,
    };

    api.generateTicket(payload)
      .then((ticket) => {
        router.push(`/tickets/${ticket.id}`);
      })
      .catch((err) => {
        console.error(err);
        setError(t("new_ticket_err_create"));
        setLoading(false);
      });
  };

  const handleQuickLaunch = () => {
    setLoading(true);
    setError(null);

    api.generateTicket({})
      .then((ticket) => {
        router.push(`/tickets/${ticket.id}`);
      })
      .catch((err) => {
        console.error(err);
        setError(t("new_ticket_err_random"));
        setLoading(false);
      });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Top Header / Breadcrumb */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <Link href="/" className="hover:text-slate-300">{t("nav_incidents")}</Link>
            <span>/</span>
            <span className="text-slate-400">{t("new_ticket_breadcrumb")}</span>
          </div>
          <h1 className="text-lg font-semibold text-slate-100">{t("new_ticket_title")}</h1>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-950/20 border border-rose-900/60 rounded text-rose-400 text-xs flex items-center space-x-2">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Form Container */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-[#0f141f] border border-slate-800/80 rounded p-5 space-y-4">
            <div className="border-b border-slate-800/80 pb-3">
              <h2 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">{t("new_ticket_section_params")}</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">{t("new_ticket_params_hint")}</p>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Category */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">{t("new_ticket_category_label")}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition"
                >
                  <option value="">{t("new_ticket_category_random")}</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">{t("new_ticket_difficulty_label")}</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition"
                >
                  <option value="">{t("new_ticket_difficulty_random")}</option>
                  {difficulties.map((diff) => (
                    <option key={diff.value} value={diff.value}>{diff.label}</option>
                  ))}
                </select>
              </div>

              {/* User Profile */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">{t("new_ticket_profile_label")}</label>
                <select
                  value={userProfile}
                  onChange={(e) => setUserProfile(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition"
                >
                  <option value="">{t("new_ticket_profile_random")}</option>
                  {profiles.map((prof) => (
                    <option key={prof.value} value={prof.value}>{prof.label}</option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">{t("new_ticket_priority_label")}</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition"
                >
                  <option value="">{t("new_ticket_priority_random")}</option>
                  {priorities.map((prio) => (
                    <option key={prio.value} value={prio.value}>{prio.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end space-x-2">
              <Link
                href="/"
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded border border-slate-800 transition"
              >
                {t("new_ticket_cancel_btn")}
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-semibold text-xs rounded transition flex items-center space-x-1.5 shadow-sm"
              >
                {loading ? t("new_ticket_creating_btn") : t("new_ticket_create_btn")}
              </button>
            </div>
          </form>
        </div>

        {/* Quick Simulation Box */}
        <div className="space-y-4">
          <div className="bg-[#0f141f] border border-slate-800/80 rounded p-5 flex flex-col justify-between h-full">
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">{t("new_ticket_quick_title")}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t("new_ticket_quick_desc")}
              </p>
              <div className="border-t border-slate-800/60 pt-3 text-[11px] text-slate-500 space-y-1">
                <p>{t("new_ticket_quick_feat1")}</p>
                <p>{t("new_ticket_quick_feat2")}</p>
                <p>{t("new_ticket_quick_feat3")}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleQuickLaunch}
              disabled={loading}
              className="mt-6 w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs rounded transition"
            >
              {loading ? t("new_ticket_quick_generating") : t("new_ticket_quick_btn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
