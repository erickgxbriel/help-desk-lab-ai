"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function NewTicket() {
  const router = useRouter();
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
    { value: "N1", label: "N1 - Fácil / Comum (Senhas, impressoras simples, VPN básica)" },
    { value: "N2", label: "N2 - Intermediário (DNS, Active Directory, rede intermediária, permissões)" },
    { value: "DESAFIO", label: "Desafio - Avançado (Sintomas vagos, pistas ocultas, usuários impacientes)" }
  ];

  const profiles = [
    { value: "LEIGO", label: "Usuário Leigo (Sem jargões, gírias simples, confunde termos)" },
    { value: "APRESSADO", label: "Usuário Apressado (Curto, impaciente, pressa de reuniões)" },
    { value: "CONFUSO", label: "Usuário Confuso (Mistura ferramentas, explica tudo errado)" },
    { value: "GESTOR", label: "Gestor (Focado em prazos, equipe parada, corporativo)" },
    { value: "DIRETOR", label: "Diretor (Urgência máxima, curto, espera prioridade alta)" },
    { value: "RH", label: "Recursos Humanos (Gosta de conversar, empático, não técnico)" },
    { value: "FINANCEIRO", label: "Financeiro (Organizado, reclama de prazos de relatórios)" },
    { value: "TECNICO", label: "Usuário Técnico (Tenta termos de TI, tentou reiniciar antes)" },
    { value: "ANSIOSO", label: "Usuário Ansioso (Medo de perder dados, preocupado com cargo)" }
  ];

  const priorities = [
    { value: "LOW", label: "Baixa (Baixo impacto local)" },
    { value: "MEDIUM", label: "Média (Impacto setorial leve)" },
    { value: "HIGH", label: "Alta (Bloqueia trabalho urgente)" },
    { value: "CRITICAL", label: "Crítica (Parada geral / diretoria)" }
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
        setError("Erro ao gerar o chamado de simulação. Verifique se o backend está online.");
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
        setError("Erro ao gerar chamado rápido. Verifique a conexão com o backend.");
        setLoading(false);
      });
  };

  return (
    <div className="max-w-3xl space-y-8 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Criar Novo Chamado</h1>
        <p className="text-slate-400 mt-1">Configure o cenário e inicie um atendimento de suporte técnico interativo.</p>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center space-x-3">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Manual Config Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="glass-panel p-6 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Configuração Customizada</h2>

            <div className="space-y-4">
              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Categoria do Problema</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="">Aleatória (Sorteada pelo sistema)</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Nível de Dificuldade</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="">Aleatório (Sorteado pelo sistema)</option>
                  {difficulties.map((diff) => (
                    <option key={diff.value} value={diff.value}>{diff.label}</option>
                  ))}
                </select>
              </div>

              {/* User Profile */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Perfil do Usuário Final (Simulação)</label>
                <select
                  value={userProfile}
                  onChange={(e) => setUserProfile(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="">Aleatório (Sorteado pelo sistema)</option>
                  {profiles.map((prof) => (
                    <option key={prof.value} value={prof.value}>{prof.label}</option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Prioridade de Atendimento</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="">Aleatória (Sorteada pelo sistema)</option>
                  {priorities.map((prio) => (
                    <option key={prio.value} value={prio.value}>{prio.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800/60">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white font-bold text-sm rounded-lg shadow-lg shadow-indigo-600/15 transition flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Gerando Laboratório...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Iniciar Laboratório</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Quick Launch Panel */}
        <div className="space-y-6">
          <div className="glass-panel p-6 bg-gradient-to-br from-indigo-950/20 to-slate-900/60 border-indigo-500/10 flex flex-col justify-between h-full min-h-[300px]">
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">Lançamento Rápido</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Quer ir direto ao ponto sem ficar configurando? 
                Clique abaixo e o sistema vai sortear um ticket aleatório entre os cenários de treinamento.
              </p>
              <div className="text-[11px] text-slate-500 border-t border-slate-800/80 pt-3 space-y-1">
                <p>• Sorteia uma das 17 categorias de TI</p>
                <p>• Embaralha perfis do usuário</p>
                <p>• Dificuldade e prioridades sorteadas</p>
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleQuickLaunch}
              disabled={loading}
              className="mt-6 w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 font-bold text-sm rounded-lg transition flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>Sortear Chamado</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
