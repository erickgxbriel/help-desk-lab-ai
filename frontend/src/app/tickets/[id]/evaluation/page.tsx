"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, TicketDetail } from "@/lib/api";

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

  useEffect(() => {
    api.getTicket(ticketId)
      .then((data) => {
        setTicket(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Não foi possível carregar a avaliação deste chamado.");
        setLoading(false);
      });
  }, [ticketId]);

  const handleRestart = () => {
    if (!confirm("Deseja reiniciar este chamado? Isso apagará a conversa anterior e a nota de avaliação, permitindo que você tente resolver o caso novamente.")) {
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
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm">Carregando relatório de avaliação...</p>
      </div>
    );
  }

  if (error || !ticket || ticket.status !== "SOLVED") {
    return (
      <div className="glass-panel p-6 border-red-900/50 bg-red-950/20 max-w-2xl mx-auto mt-10">
        <h2 className="text-red-400 font-bold text-lg mb-2">Relatório Indisponível</h2>
        <p className="text-slate-300 text-sm mb-4">
          {error || "Este chamado ainda não foi finalizado e avaliado ou não foi encontrado."}
        </p>
        <div className="flex space-x-3">
          <Link href="/" className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition">
            Voltar ao Dashboard
          </Link>
          {ticket && ticket.status === "OPEN" && (
            <Link href={`/tickets/${ticketId}`} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition">
              Atender Chamado
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Parse feedback JSON from ticket
  let feedbackData = {
    strengths: ["Polidez no atendimento"],
    improvements: ["Melhorar identificação de causa raiz"],
    diagnosis_probable: "Nenhum diagnóstico registrado",
    feedback_text: "Avaliação efetuada."
  };

  if (ticket.feedback) {
    try {
      feedbackData = JSON.parse(ticket.feedback);
    } catch (e) {
      console.error("Failed to parse ticket feedback JSON", e);
    }
  }

  const score = ticket.score ?? 0;
  
  // Color classes based on score
  const getScoreColors = (val: number) => {
    if (val >= 80) return { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", fill: "#10b981" };
    if (val >= 60) return { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", fill: "#f59e0b" };
    return { text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", fill: "#ef4444" };
  };
  const colors = getScoreColors(score);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
      {/* Back button */}
      <div>
        <Link 
          href="/" 
          className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Voltar ao Dashboard</span>
        </Link>
      </div>

      {/* Main Header / Score overview */}
      <div className="glass-panel p-8 bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col md:flex-row items-center gap-8">
        {/* Visual score circle */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center rounded-full bg-slate-950 border border-slate-800 shadow-inner">
          <svg className="absolute w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="54"
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r="54"
              stroke={colors.fill}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 54}
              strokeDashoffset={2 * Math.PI * 54 * (1 - score / 100)}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="text-center z-10">
            <span className="text-4xl font-extrabold text-white tracking-tighter">{score}</span>
            <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider mt-0.5">Pontos</span>
          </div>
        </div>

        {/* Audit Details */}
        <div className="flex-1 space-y-3 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
              {ticket.id}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-400">
              {ticket.category}
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
              Avaliação: {score >= 80 ? "Aprovado" : score >= 60 ? "Atenção" : "Abaixo da Média"}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 leading-tight">
            Relatório de Avaliação do Chamado
          </h1>
          <p className="text-xs text-slate-400">
            Cenário: <b>{ticket.title}</b> | Dificuldade: <b>{ticket.difficulty}</b> | Usuário: <b>{ticket.user_profile}</b>
          </p>
        </div>
      </div>

      {/* Strengths and Weaknesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="glass-panel p-6 border-emerald-500/10 bg-emerald-500/2">
          <h3 className="font-bold text-sm text-emerald-400 uppercase tracking-wider mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pontos Fortes
          </h3>
          <ul className="space-y-2.5">
            {feedbackData.strengths.map((str, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="glass-panel p-6 border-rose-500/10 bg-rose-500/2">
          <h3 className="font-bold text-sm text-rose-400 uppercase tracking-wider mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Pontos de Melhoria
          </h3>
          <ul className="space-y-2.5">
            {feedbackData.improvements.map((imp, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Comparative cards: expected vs diagnostic */}
      <div className="glass-panel p-6 space-y-6">
        <h3 className="font-bold text-sm text-slate-400 uppercase tracking-wider border-b border-slate-900 pb-3">
          Análise de Resolução Técnica
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/40 p-4.5 rounded-lg border border-slate-900 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Diagnóstico Proposto por Você
            </span>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{feedbackData.diagnosis_probable}"
            </p>
          </div>

          <div className="bg-indigo-950/10 p-4.5 rounded-lg border border-indigo-900/20 space-y-2">
            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
              Solução Esperada (Gabarito)
            </span>
            <p className="text-xs text-indigo-300 leading-relaxed">
              {ticket.expected_solution}
            </p>
          </div>
        </div>

        {/* Detailed audit text */}
        <div className="bg-slate-900/20 p-5 rounded-lg border border-slate-900/50 space-y-2">
          <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
            Feedback Detalhado do Auditor de Qualidade
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {feedbackData.feedback_text}
          </p>
        </div>
      </div>

      {/* Bottom buttons panel */}
      <div className="flex flex-wrap gap-4 justify-end">
        <button
          type="button"
          onClick={handleRestart}
          disabled={restarting}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-lg border border-slate-800 hover:border-slate-600 transition"
        >
          {restarting ? "Reiniciando..." : "Refazer Atendimento"}
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-lg shadow-indigo-600/10 transition"
        >
          Concluir e Ir para Dashboard
        </Link>
      </div>
    </div>
  );
}
