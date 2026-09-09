"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, DashboardStats } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import { TICKET_KNOWLEDGE } from "@/lib/ticketKnowledge";

export default function Dashboard() {
  const { t, language } = useI18n();
  const lang = language as "pt" | "en" | "es";
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"ALL" | "OPEN" | "SOLVED">("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    api.getStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Não foi possível conectar ao servidor de chamados (backend:8000).");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 text-xs">{t("dash_loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-rose-900/60 bg-rose-950/20 max-w-xl mx-auto mt-8 rounded">
        <div className="flex items-center space-x-2 text-rose-400 font-semibold text-xs mb-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{t("dash_error_title")}</span>
        </div>
        <p className="text-slate-300 text-xs mb-3">{t("dash_error_conn")}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs rounded border border-slate-700 transition"
        >
          {t("dash_btn_reconnect")}
        </button>
      </div>
    );
  }

  const allTickets = stats?.recent_tickets || [];
  
  // Extract unique categories from tickets
  const availableCategories = Array.from(new Set(allTickets.map((t) => t.category)));

  // Filter tickets by Status, Category and Search
  const filteredTickets = allTickets.filter((ticket) => {
    // 1. Status Filter
    if (filter === "OPEN" && ticket.status === "RESOLVED") return false;
    if (filter === "SOLVED" && ticket.status !== "RESOLVED") return false;

    // 2. Category Filter
    if (categoryFilter !== "ALL" && ticket.category !== categoryFilter) return false;

    // 3. Search Query (matches ID, title, description, category, user profile)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchId = ticket.id.toLowerCase().includes(q);
      const matchTitle = ticket.title.toLowerCase().includes(q);
      const matchDesc = ticket.description.toLowerCase().includes(q);
      const matchCategory = ticket.category.toLowerCase().includes(q);
      const matchProfile = ticket.user_profile.toLowerCase().includes(q);
      if (!matchId && !matchTitle && !matchDesc && !matchCategory && !matchProfile) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <h1 className="text-lg font-semibold text-slate-100">{t("dash_title")}</h1>
          <p className="text-xs text-slate-400 mt-0.5">{t("dash_subtitle")}</p>
        </div>
        <div className="flex items-center space-x-2.5">
          <Link
            href="/academy"
            className="px-3.5 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 text-xs font-semibold rounded transition flex items-center space-x-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{t("dash_academy_btn")}</span>
          </Link>
          <Link
            href="/tickets/new"
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded shadow-sm transition flex items-center space-x-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>{t("dash_new_btn")}</span>
          </Link>
        </div>
      </div>

      {/* Corporate ITSM KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{t("dash_total_base")}</span>
            <span className="p-1 rounded bg-slate-800/60 text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-100">{stats?.total_tickets}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">{t("dash_total_sub")}</span>
          </div>
        </div>

        <div className="glass-panel p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">{t("dash_open_title")}</span>
            <span className="p-1 rounded bg-amber-500/10 text-amber-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-amber-400">{stats?.open_tickets}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">{t("dash_open_sub")}</span>
          </div>
        </div>

        <div className="glass-panel p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">{t("dash_completed_title")}</span>
            <span className="p-1 rounded bg-emerald-500/10 text-emerald-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-emerald-400">{stats?.completed_tickets}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">{t("dash_completed_sub")}</span>
          </div>
        </div>

        <div className="glass-panel p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">{t("dash_score_title")}</span>
            <span className="p-1 rounded bg-blue-500/10 text-blue-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-100">
              {stats?.avg_score !== undefined ? `${stats.avg_score}` : "0"}
              <span className="text-xs text-slate-500 font-normal"> / 100</span>
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">{t("dash_score_sub")}</span>
          </div>
        </div>
      </div>

      {/* Incident Queue Table */}
      <div className="glass-panel overflow-hidden">
        {/* Table Filter & Search Toolbar */}
        <div className="px-4 py-3 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-950/40">
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Pills */}
            <div className="flex items-center space-x-1 bg-slate-900 p-0.5 rounded border border-slate-800">
              <button
                onClick={() => setFilter("ALL")}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition ${
                  filter === "ALL" 
                    ? "bg-slate-800 text-white shadow-xs" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t("dash_filter_all")} ({allTickets.length})
              </button>
              <button
                onClick={() => setFilter("OPEN")}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition ${
                  filter === "OPEN" 
                    ? "bg-slate-800 text-amber-400 shadow-xs" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t("dash_filter_open")} ({stats?.open_tickets || 0})
              </button>
              <button
                onClick={() => setFilter("SOLVED")}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition ${
                  filter === "SOLVED" 
                    ? "bg-slate-800 text-emerald-400 shadow-xs" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t("dash_filter_solved")} ({stats?.completed_tickets || 0})
              </button>
            </div>

            {/* Category Dropdown Filter */}
            <div className="flex items-center space-x-1.5">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-blue-500 transition"
              >
                <option value="ALL">{t("dash_all_categories")} ({allTickets.length})</option>
                {availableCategories.map((cat) => {
                  const count = allTickets.filter(t => t.category === cat).length;
                  const sampleTicket = allTickets.find(t => t.category === cat);
                  const translatedCat = (sampleTicket && TICKET_KNOWLEDGE[sampleTicket.id]?.category?.[lang]) || cat;
                  return (
                    <option key={cat} value={cat}>
                      {translatedCat} ({count})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("dash_search_placeholder")}
              className="w-full sm:w-64 bg-slate-900 border border-slate-800 rounded px-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Dense Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/40 text-slate-400 font-medium">
                <th className="py-2.5 px-4">{t("dash_table_id")}</th>
                <th className="py-2.5 px-4">{t("dash_table_category")}</th>
                <th className="py-2.5 px-4">{t("dash_table_priority")}</th>
                <th className="py-2.5 px-4">{t("dash_table_level")}</th>
                <th className="py-2.5 px-4">{t("dash_table_profile")}</th>
                <th className="py-2.5 px-4">{t("dash_table_status")}</th>
                <th className="py-2.5 px-4 text-right">{t("dash_table_action")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    {t("dash_no_tickets")}
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 max-w-xs">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-blue-400 text-xs shrink-0">{ticket.id}</span>
                        <Link 
                          href={`/tickets/${ticket.id}`} 
                          className="font-medium text-slate-200 hover:text-blue-400 transition-colors truncate"
                        >
                          {TICKET_KNOWLEDGE[ticket.id]?.title?.[lang] || ticket.title}
                        </Link>
                      </div>
                      <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                        {ticket.description}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {TICKET_KNOWLEDGE[ticket.id]?.category?.[lang] || ticket.category}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        ticket.priority === "CRITICAL" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" :
                        ticket.priority === "HIGH" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                        ticket.priority === "MEDIUM" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                        "bg-slate-700/30 text-slate-400 border border-slate-700/50"
                      }`}>
                        {ticket.priority === "CRITICAL" ? t("dash_priority_critical") :
                         ticket.priority === "HIGH" ? t("dash_priority_high") :
                         ticket.priority === "MEDIUM" ? t("dash_priority_medium") :
                         t("dash_priority_low")}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${
                        ticket.difficulty === "N1" ? "text-emerald-400" :
                        ticket.difficulty === "N2" ? "text-amber-400" : "text-rose-400"
                      }`}>
                        {t("dash_level_prefix")} {ticket.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {ticket.user_profile}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[10px] font-semibold ${
                        ticket.status === "RESOLVED"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          ticket.status === "RESOLVED" ? "bg-emerald-400" : "bg-amber-400"
                        }`}></span>
                        <span>{ticket.status === "RESOLVED" ? t("chat_status_resolved") : t("chat_status_open")}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {ticket.status === "RESOLVED" ? (
                        <Link
                          href={`/tickets/${ticket.id}/evaluation`}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-blue-400 border border-blue-500/30 rounded text-[11px] font-semibold transition inline-block"
                        >
                          {t("dash_btn_view_eval")}
                        </Link>
                      ) : (
                        <Link
                          href={`/tickets/${ticket.id}`}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-semibold transition inline-block shadow-xs"
                        >
                          {t("dash_btn_attend")}
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
