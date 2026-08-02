"use client";

import { useEffect, useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, TicketDetail, Message } from "@/lib/api";

interface ChatRoomProps {
  params: Promise<{ id: string }>;
}

export default function ChatRoom({ params }: ChatRoomProps) {
  const router = useRouter();
  const { id: ticketId } = use(params);

  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  // Resolve Modal State
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [diagnosisInput, setDiagnosisInput] = useState("");
  const [resolving, setResolving] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fetch ticket details
  const loadTicket = () => {
    api.getTicket(ticketId)
      .then((data) => {
        setTicket(data);
        setMessages(data.messages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Não foi possível carregar as informações do chamado.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadTicket();
  }, [ticketId]);

  // Scroll to bottom when messages list changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending || isTyping) return;

    const userMessageText = input.trim();
    setInput("");
    setSending(true);

    // Optimistically add technician message to UI
    const tempId = Date.now();
    const optimisticMessage: Message = {
      id: tempId,
      ticket_id: ticketId,
      sender: "AGENT",
      content: userMessageText,
      created_at: new Date().toISOString()
    };
    setMessages((prev) => [...prev, optimisticMessage]);

    // Check if realism delay is selected in settings
    const isRealMode = ticket?.status === "OPEN"; // We can simulate a delay
    if (isRealMode) {
      setIsTyping(true);
    }

    // Call API
    api.sendChatMessage(ticketId, userMessageText)
      .then((updatedMessages) => {
        // To simulate a typing delay for realistic mode
        const delay = isRealMode ? Math.min(3000, 1000 + userMessageText.length * 15) : 0;
        
        setTimeout(() => {
          setMessages(updatedMessages);
          setIsTyping(false);
          setSending(false);
        }, delay);
      })
      .catch((err) => {
        console.error(err);
        setError("Falha ao enviar mensagem.");
        setIsTyping(false);
        setSending(false);
      });
  };

  const handleRestart = () => {
    if (!confirm("Deseja realmente limpar toda a conversa e reiniciar o atendimento deste chamado?")) {
      return;
    }
    setLoading(true);
    api.restartTicket(ticketId)
      .then((data) => {
        setTicket(data);
        setMessages(data.messages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao reiniciar o chamado.");
        setLoading(false);
      });
  };

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagnosisInput.trim() || resolving) return;

    setResolving(true);
    api.resolveTicket(ticketId, diagnosisInput)
      .then(() => {
        setResolving(false);
        setShowResolveModal(false);
        router.push(`/tickets/${ticketId}/evaluation`);
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao encerrar chamado.");
        setResolving(false);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm">Entrando na sala de atendimento...</p>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="glass-panel p-6 border-red-900/50 bg-red-950/20 max-w-2xl mx-auto mt-10">
        <h2 className="text-red-400 font-bold text-lg mb-2">Erro na Sala de Chat</h2>
        <p className="text-slate-300 text-sm mb-4">{error || "Chamado não encontrado."}</p>
        <Link href="/" className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition">
          Voltar ao Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8.5rem)] flex gap-6 animate-fade-in overflow-hidden">
      {/* Left Panel: Ticket Details */}
      <div className="w-80 flex flex-col justify-between shrink-0 glass-panel p-6 bg-slate-950/60 overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-indigo-400">
              {ticket.id}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              ticket.priority === "CRITICAL" ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" :
              ticket.priority === "HIGH" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
              ticket.priority === "MEDIUM" ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20" :
              "bg-slate-500/10 text-slate-400 border border-slate-500/20"
            }`}>
              Prioridade: {ticket.priority}
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white leading-tight">{ticket.title}</h2>
            <p className="text-[11px] text-slate-500">
              Criado em: {new Date(ticket.created_at).toLocaleString("pt-BR")}
            </p>
          </div>

          <div className="border-t border-slate-900 pt-4 space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Metadados do Chamado</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-900">
                <span className="text-slate-500 text-[10px] block">Categoria</span>
                <span className="font-bold text-slate-200 mt-0.5 block truncate">{ticket.category}</span>
              </div>
              <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-900">
                <span className="text-slate-500 text-[10px] block">Dificuldade</span>
                <span className={`font-bold mt-0.5 block ${
                  ticket.difficulty === "N1" ? "text-emerald-400" :
                  ticket.difficulty === "N2" ? "text-amber-400" : "text-rose-400"
                }`}>{ticket.difficulty}</span>
              </div>
              <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-900 col-span-2">
                <span className="text-slate-500 text-[10px] block">Perfil do Usuário</span>
                <span className="font-bold text-indigo-300 mt-0.5 block truncate">{ticket.user_profile}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-4 space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Descrição Inicial</h3>
            <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-900 text-xs text-slate-300 leading-relaxed italic">
              "{ticket.description}"
            </div>
          </div>
        </div>

        {/* Action button panel */}
        <div className="border-t border-slate-900 pt-4 space-y-2.5 mt-6">
          {ticket.status === "OPEN" ? (
            <>
              <button
                type="button"
                onClick={() => setShowResolveModal(true)}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-md shadow-emerald-600/10 transition flex items-center justify-center space-x-1.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Finalizar Chamado</span>
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-semibold rounded-lg transition"
              >
                Reiniciar Atendimento
              </button>
            </>
          ) : (
            <Link
              href={`/tickets/${ticketId}/evaluation`}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg text-center block shadow-md shadow-indigo-600/10 transition"
            >
              Ver Avaliação Completa
            </Link>
          )}
        </div>
      </div>

      {/* Right Panel: Chat Messenger */}
      <div className="flex-1 flex flex-col glass-panel bg-slate-950/40 border border-slate-800/80 overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-slate-800/60 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-slate-300 uppercase shadow-inner">
              {ticket.user_profile.substring(0, 2)}
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-200">Usuário Final ({ticket.user_profile})</h3>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-slate-400">Cliente conectado via chat</span>
              </div>
            </div>
          </div>
          {ticket.status === "SOLVED" && (
            <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
              Caso Solucionado
            </span>
          )}
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-950/20">
          {/* Default Welcome Message */}
          <div className="flex justify-start">
            <div className="max-w-[70%] glass-panel px-4 py-3 bg-slate-900 border-slate-800/80 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-300 leading-relaxed">
              Olá. Meu nome é o que está no chamado. Registrei esse chamado porque: "{ticket.description}"
            </div>
          </div>

          {messages.map((msg) => {
            const isAgent = msg.sender === "AGENT";
            return (
              <div key={msg.id} className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-3 text-sm leading-relaxed shadow-sm rounded-2xl ${
                  isAgent
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "glass-panel bg-slate-900 border-slate-800/80 text-slate-300 rounded-tl-none"
                }`}>
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <span className={`text-[9px] block mt-1.5 text-right ${
                    isAgent ? "text-indigo-200" : "text-slate-500"
                  }`}>
                    {new Date(msg.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="glass-panel px-4 py-3 bg-slate-900 border-slate-800/80 rounded-2xl rounded-tl-none flex items-center space-x-1.5 text-slate-400">
                <span className="text-xs italic mr-1">Cliente digitando</span>
                <span className="typing-dots inline-flex items-center space-x-0.5">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Chat input box */}
        <div className="p-4 border-t border-slate-800/60 bg-slate-950/80">
          <form onSubmit={handleSendMessage} className="flex space-x-3">
            <input
              type="text"
              disabled={ticket.status !== "OPEN" || sending || isTyping}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                ticket.status !== "OPEN" 
                  ? "Atendimento finalizado. Verifique a avaliação."
                  : isTyping 
                    ? "Aguarde o cliente responder..." 
                    : "Digite sua pergunta técnica..."
              }
              className="flex-1 bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 disabled:opacity-50 transition"
            />
            <button
              type="submit"
              disabled={ticket.status !== "OPEN" || !input.trim() || sending || isTyping}
              className="px-5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-900 disabled:text-slate-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/10 transition flex items-center justify-center shrink-0"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      {/* Resolve / Diagnosis Input Modal */}
      {showResolveModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg bg-slate-950 border border-slate-800 p-6 space-y-5 animate-scale-up shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white">Fechar Chamado — Propor Solução</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Descreva qual foi o seu diagnóstico do problema e a solução executada.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowResolveModal(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleResolveSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Diagnóstico e Ações executadas</label>
                <textarea
                  required
                  value={diagnosisInput}
                  onChange={(e) => setDiagnosisInput(e.target.value)}
                  placeholder="Ex: Identifiquei que o cabo de rede RJ45 estava solto na parte traseira da impressora. Orientei o usuário a conectar o cabo firmemente e o status da impressora alterou para online, permitindo a impressão de testes com sucesso."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition min-h-[120px]"
                />
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-amber-500 bg-amber-500/5 p-3 rounded-lg border border-amber-500/10">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Atenção: Ao enviar, o chamado será fechado e enviado para a avaliação automática do auditor de qualidade.</span>
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowResolveModal(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={resolving}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-lg shadow-emerald-600/15 transition flex items-center space-x-1"
                >
                  {resolving ? (
                    <span>Avaliando...</span>
                  ) : (
                    <span>Confirmar Encerramento</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
