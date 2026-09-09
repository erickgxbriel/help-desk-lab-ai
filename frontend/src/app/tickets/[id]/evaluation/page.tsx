"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, TicketDetail } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import { TICKET_KNOWLEDGE } from "@/lib/ticketKnowledge";

interface EvaluationPageProps {
  params: Promise<{ id: string }>;
}

export default function EvaluationPage({ params }: EvaluationPageProps) {
  const router = useRouter();
  const { id: ticketId } = use(params);

  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [restarting, setRestarting] = useState(false);

  const { t, language } = useI18n();
  const lang = language as "pt" | "en" | "es";

  useEffect(() => {
    api.getTicket(ticketId)
      .then((data) => {
        setTicket(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Não foi possível carregar a avaliação deste incidente.");
        setLoading(false);
      });
  }, [ticketId]);

  const handleRestart = () => {
    if (!confirm("Deseja reiniciar este chamado? O histórico e nota serão limpos para uma nova tentativa.")) {
      return;
    }
    setRestarting(true);
    api.restartTicket(ticketId)
      .then(() => {
        router.push(`/tickets/${ticketId}`);
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao reiniciar o chamado.");
        setRestarting(false);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 text-xs">{t("eval_loading")}</p>
      </div>
    );
  }

  if (error || !ticket || ticket.status !== "SOLVED") {
    return (
      <div className="p-4 border border-rose-900/60 bg-rose-950/20 max-w-xl mx-auto mt-8 rounded">
        <h2 className="text-rose-400 font-semibold text-xs mb-1">{t("eval_unavailable")}</h2>
        <p className="text-slate-300 text-xs mb-3">
          {error || t("eval_not_finished")}
        </p>
        <div className="flex space-x-2">
          <Link href="/" className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs rounded border border-slate-700 transition">
            {t("eval_back_queue")}
          </Link>
          {ticket && ticket.status === "OPEN" && (
            <Link href={`/tickets/${ticketId}`} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded transition">
              {t("eval_attend_incident")}
            </Link>
          )}
        </div>
      </div>
    );
  }

  let feedbackData = {
    strengths: ["Polidez e cordialidade no atendimento"],
    improvements: ["Identificar causa raiz antes de propor ações"],
    diagnosis_probable: "Nenhum diagnóstico registrado",
    feedback_text: "Avaliação efetuada pelo auditor."
  };

  if (ticket.feedback) {
    try {
      feedbackData = JSON.parse(ticket.feedback);
    } catch (e) {
      console.error("Failed to parse ticket feedback JSON", e);
    }
  }

  const score = ticket.score ?? 0;
  const isApproved = score >= 70;

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Top Header / Breadcrumb */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <Link href="/" className="hover:text-slate-300">{t("nav_incidents")}</Link>
            <span>/</span>
            <span className="font-mono text-blue-400">{ticket.id}</span>
            <span>/</span>
            <span className="text-slate-400">{t("eval_audit_qa")}</span>
          </div>
          <h1 className="text-lg font-semibold text-slate-100">{t("eval_report_title")}</h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleRestart}
            disabled={restarting}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded border border-slate-800 transition"
          >
            {restarting ? t("eval_restarting") : t("eval_redo_btn")}
          </button>
          <Link
            href="/"
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded transition shadow-sm"
          >
            {t("eval_finish_btn")}
          </Link>
        </div>
      </div>

      {/* Main Score KPI Overview */}
      <div className="bg-[#0f141f] border border-slate-800/80 rounded p-5 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 rounded border flex flex-col items-center justify-center ${
            isApproved 
              ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-400" 
              : "bg-rose-950/30 border-rose-500/30 text-rose-400"
          }`}>
            <span className="text-2xl font-bold font-mono leading-none">{score}</span>
            <span className="text-[9px] uppercase font-semibold tracking-wider mt-0.5">/ 100 pts</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
                isApproved 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                  : "bg-rose-500/10 text-rose-400 border-rose-500/20"
              }`}>
                {isApproved ? t("eval_approved") : t("eval_needs_review")}
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {ticket.id}</span>
            </div>
            <h2 className="text-sm font-semibold text-slate-100">{TICKET_KNOWLEDGE[ticket.id]?.title?.[lang] || ticket.title}</h2>
            <p className="text-[11px] text-slate-500">
              {t("dash_table_category")}: <b>{TICKET_KNOWLEDGE[ticket.id]?.category?.[lang] || ticket.category}</b> | {t("eval_complexity")}: <b>{ticket.difficulty}</b> | {t("eval_requester")}: <b>{ticket.user_profile}</b>
            </p>
          </div>
        </div>
      </div>

      {/* Strengths and Improvements Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-[#0f141f] border border-slate-800/80 rounded p-4 space-y-3">
          <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{t("eval_strengths")}</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {feedbackData.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-[#0f141f] border border-slate-800/80 rounded p-4 space-y-3">
          <h3 className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>{t("eval_improvements")}</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {feedbackData.improvements.map((imp, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Solution Comparison & Detailed Feedback */}
      <div className="bg-[#0f141f] border border-slate-800/80 rounded p-5 space-y-4">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider border-b border-slate-800/80 pb-2">
          {t("eval_technical_analysis")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-950/50 rounded border border-slate-800/80 space-y-1.5">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block">
              {t("eval_submitted_diagnosis")}
            </span>
            <p className="text-slate-300 leading-relaxed italic">
              "{feedbackData.diagnosis_probable}"
            </p>
          </div>

          <div className="p-3 bg-blue-950/20 rounded border border-blue-900/30 space-y-1.5">
            <span className="text-[10px] uppercase font-semibold text-blue-400 block">
              {t("eval_expected_solution")}
            </span>
            <p className="text-blue-200 leading-relaxed">
              {ticket.expected_solution}
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950/30 rounded border border-slate-800/60 space-y-1 text-xs">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">
            {t("eval_qa_opinion")}
          </span>
          <p className="text-slate-300 leading-relaxed">
            {feedbackData.feedback_text}
          </p>
        </div>
      </div>
    </div>
  );
}
