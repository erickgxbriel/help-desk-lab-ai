"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, DashboardStats } from "@/lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Não foi possível carregar as estatísticas. Certifique-se de que o backend está rodando na porta 8000.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm">Carregando painel do laboratório...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel p-6 border-red-900/50 bg-red-950/20 max-w-2xl mx-auto mt-10">
        <h2 className="text-red-400 font-bold text-lg mb-2 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Erro de Conexão
        </h2>
        <p className="text-slate-300 text-sm mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  const recentTickets = stats?.recent_tickets || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Acompanhe seu progresso de suporte e treine com novos chamados.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-10 text-indigo-400 group-hover:scale-110 transition-transform">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total de Chamados</span>
          <span className="text-4xl font-extrabold text-white mt-4">{stats?.total_tickets}</span>
          <span className="text-[10px] text-slate-500 mt-2">Registrados na base local</span>
        </div>

        <div className="glass-panel p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-10 text-amber-500 group-hover:scale-110 transition-transform">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Em Aberto</span>
          <span className="text-4xl font-extrabold text-amber-400 mt-4">{stats?.open_tickets}</span>
          <span className="text-[10px] text-slate-500 mt-2">Aguardando atendimento</span>
        </div>

        <div className="glass-panel p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-10 text-emerald-500 group-hover:scale-110 transition-transform">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Concluídos</span>
          <span className="text-4xl font-extrabold text-emerald-400 mt-4">{stats?.completed_tickets}</span>
          <span className="text-[10px] text-slate-500 mt-2">Avaliados e encerrados</span>
        </div>

        <div className="glass-panel p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-10 text-cyan-400 group-hover:scale-110 transition-transform">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Média Geral de Score</span>
          <span className="text-4xl font-extrabold text-indigo-300 mt-4">
            {stats?.avg_score !== undefined ? `${stats.avg_score}/100` : "0.0"}
          </span>
          <span className="text-[10px] text-slate-500 mt-2">Baseado nas avaliações</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent tickets */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Chamados Recentes</h2>
            <Link 
              href="/tickets/new" 
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
            >
              <span>Criar Chamado</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="glass-panel divide-y divide-slate-800/60 overflow-hidden">
            {recentTickets.length === 0 ? (
              <div className="p-10 text-center text-slate-500">
                Nenhum chamado criado ainda. Clique em "Novo Chamado" no menu ao lado para iniciar.
              </div>
            ) : (
              recentTickets.map((ticket) => (
                <div key={ticket.id} className="p-5 flex items-center justify-between hover:bg-slate-900/30 transition">
                  <div className="space-y-1.5 pr-4 flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                        {ticket.id}
                      </span>
                      <h3 className="font-bold text-sm text-slate-100 hover:text-indigo-400 transition">
                        <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                      </h3>
                      {ticket.status === "OPEN" ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          Em Aberto
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          Resolvido ({ticket.score} pts)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{ticket.description}</p>
                    <div className="flex items-center space-x-4 text-[10px] text-slate-500">
                      <span>Categoria: <b>{ticket.category}</b></span>
                      <span>Dificuldade: 
                        <b className={`ml-1 ${
                          ticket.difficulty === "N1" ? "text-emerald-400" :
                          ticket.difficulty === "N2" ? "text-amber-400" : "text-rose-400"
                        }`}>{ticket.difficulty}</b>
                      </span>
                      <span>Perfil: <b>{ticket.user_profile}</b></span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <Link
                      href={ticket.status === "OPEN" ? `/tickets/${ticket.id}` : `/tickets/${ticket.id}/evaluation`}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        ticket.status === "OPEN" 
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10" 
                          : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                      }`}
                    >
                      {ticket.status === "OPEN" ? "Atender" : "Ver Avaliação"}
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Training Info & Callout */}
        <div className="space-y-6">
          <div className="glass-panel p-6 bg-gradient-to-br from-indigo-950/20 to-slate-900/60 border-indigo-500/10">
            <h3 className="font-bold text-base text-white mb-2 flex items-center">
              <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Como Funciona o Lab?
            </h3>
            <ul className="text-xs text-slate-300 space-y-3 list-disc pl-4 mt-3">
              <li>
                <b>1. Escolha o Chamado:</b> Gere um ticket customizado escolhendo a dificuldade e o perfil de atendimento.
              </li>
              <li>
                <b>2. Investigue o Caso:</b> Faça perguntas no chat. A IA responderá como o cliente final, sem saber a resposta técnica de cabeça.
              </li>
              <li>
                <b>3. Resolva o Ticket:</b> Proponha a solução. Quando achar que resolveu, clique em "Finalizar" e envie seu diagnóstico.
              </li>
              <li>
                <b>4. Receba Nota:</b> Nosso auditor de qualidade avaliará sua clareza, velocidade, postura e assertividade técnica de 0 a 100.
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/tickets/new"
                className="w-full text-center block px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-lg shadow-indigo-600/20 transition"
              >
                Iniciar Novo Treinamento
              </Link>
            </div>
          </div>

          <div className="glass-panel p-6 bg-slate-950/50">
            <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-3">Dica do Especialista</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Chamados de nível <b>DESAFIO</b> contêm sintomas falsos e usuários que mentem ou omitem fatos. 
              Sempre verifique detalhes físicos simples primeiro, como cabos e conexões locais, antes de sugerir comandos complexos de rede."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
