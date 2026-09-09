"use client";

import { useEffect, useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, TicketDetail, Message } from "@/lib/api";
import { TICKET_KNOWLEDGE } from "@/lib/ticketKnowledge";
import { useI18n } from "@/lib/i18n";

interface ChatRoomProps {
  params: Promise<{ id: string }>;
}

export default function ChatRoom({ params }: ChatRoomProps) {
  const router = useRouter();
  const { t, language } = useI18n();
  const lang = language as "pt" | "en" | "es";
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
        setError(t("chat_err_load"));
        setLoading(false);
      });
  };

  useEffect(() => {
    loadTicket();
  }, [ticketId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending || isTyping) return;

    const userMessageText = input.trim();
    setInput("");
    setSending(true);
    setIsTyping(true);

    const tempMessage: Message = {
      id: Math.random(),
      ticket_id: ticketId,
      sender: "AGENT",
      content: userMessageText,
      created_at: new Date().toISOString()
    };
    setMessages((prev) => [...prev, tempMessage]);

    api.sendChatMessage(ticketId, userMessageText)
      .then((updatedMessages) => {
        const isRealMode = localStorage.getItem("servicedesk_real_mode") !== "false";
        const delay = isRealMode ? Math.min(2500, 800 + userMessageText.length * 12) : 0;
        
        setTimeout(() => {
          setMessages(updatedMessages);
          setIsTyping(false);
          setSending(false);
        }, delay);
      })
      .catch((err) => {
        console.error(err);
        setError(t("chat_err_send"));
        setIsTyping(false);
        setSending(false);
      });
  };

  const handleRestart = () => {
    if (!confirm(t("chat_confirm_restart"))) {
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
        setError(t("chat_err_restart"));
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
        alert(t("chat_err_resolve"));
        setResolving(false);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 text-xs">{t("chat_loading_console")}</p>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="p-4 border border-rose-900/60 bg-rose-950/20 max-w-xl mx-auto mt-8 rounded">
        <h2 className="text-rose-400 font-semibold text-xs mb-1">{t("chat_error_title")}</h2>
        <p className="text-slate-300 text-xs mb-3">{error || t("chat_error_not_found")}</p>
        <Link href="/" className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs rounded border border-slate-700 transition">
          {t("nav_incidents")}
        </Link>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-7.5rem)] flex flex-col space-y-4 max-w-7xl mx-auto overflow-hidden">
      {/* Top ITSM Breadcrumb & Ticket Header Bar */}
      <div className="bg-[#0f141f] border border-slate-800/80 rounded p-3 px-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center space-x-3">
          <Link href="/" className="text-xs text-slate-400 hover:text-slate-200 transition">
            ← {t("nav_incidents")}
          </Link>
          <span className="text-slate-700">|</span>
          <span className="font-mono font-bold text-xs text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-900/50">
            {ticket.id}
          </span>
          <h1 className="font-semibold text-sm text-slate-100 truncate max-w-md">{TICKET_KNOWLEDGE[ticket.id]?.title?.[lang] || ticket.title}</h1>
        </div>

        <div className="flex items-center space-x-2">
          {ticket.status === "OPEN" ? (
            <button
              type="button"
              onClick={() => setShowResolveModal(true)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded transition flex items-center space-x-1.5 shadow-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{t("chat_resolve_btn")}</span>
            </button>
          ) : (
            <Link
              href={`/tickets/${ticketId}/evaluation`}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded transition"
            >
              {t("chat_view_qa_report")}
            </Link>
          )}

          <button
            type="button"
            onClick={handleRestart}
            title={t("chat_restart_title")}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs rounded transition"
          >
            {t("chat_restart_btn")}
          </button>
        </div>
      </div>

      {/* Main Workspace (Activity Feed + Side Details) */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left/Main Column: Activity Stream / Interactive Chat */}
        <div className="flex-1 flex flex-col bg-[#0f141f] border border-slate-800/80 rounded overflow-hidden">
          {/* Chat Stream Header */}
          <div className="px-4 py-2.5 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-semibold text-slate-200">{t("chat_direct_channel")}</span>
              <span className="text-[11px] text-slate-500 font-mono">({ticket.user_profile})</span>
            </div>
            <span className="text-[11px] text-slate-500">{t("chat_audit_logged")}</span>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0b0f17]/60 text-xs">
            {/* Initial description note */}
            <div className="border border-slate-800/80 bg-slate-900/50 p-3 rounded text-slate-300">
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                <span className="font-semibold text-slate-400">{t("chat_initial_desc_label")}</span>
                <span>{new Date(ticket.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <p className="italic text-slate-300">"{ticket.description}"</p>
            </div>

            {messages.map((msg) => {
              const isAgent = msg.sender === "AGENT";
              return (
                <div key={msg.id} className={`flex flex-col ${isAgent ? "items-end" : "items-start"}`}>
                  <div className="flex items-center space-x-1.5 mb-1 px-1 text-[10px] text-slate-500">
                    <span className="font-semibold text-slate-400">
                      {isAgent ? t("chat_sender_agent") : `${t("chat_sender_user_prefix")} (${ticket.user_profile})`}
                    </span>
                    <span>•</span>
                    <span>{new Date(msg.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>

                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded text-xs leading-relaxed ${
                    isAgent
                      ? "bg-blue-600 text-white rounded-tr-none shadow-sm"
                      : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
                  }`}>
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs p-2 bg-slate-900/40 rounded border border-slate-800/40 w-fit">
                <span className="text-[11px] italic">{t("chat_typing_status")}</span>
                <span className="typing-dots inline-flex items-center space-x-0.5">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Chat Composer */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                disabled={ticket.status !== "OPEN" || sending || isTyping}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  ticket.status !== "OPEN" 
                    ? t("chat_closed_placeholder")
                    : isTyping 
                      ? t("chat_waiting_placeholder") 
                      : t("chat_input_placeholder")
                }
                className="flex-1 bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 disabled:opacity-50 transition"
              />
              <button
                type="submit"
                disabled={ticket.status !== "OPEN" || !input.trim() || sending || isTyping}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded font-semibold text-xs transition"
              >
                {t("chat_send_btn")}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Ticket Meta / Requester Details */}
        <div className="w-80 flex flex-col bg-[#0f141f] border border-slate-800/80 rounded shrink-0 overflow-y-auto">
          <div className="p-3.5 border-b border-slate-800/80 bg-slate-950/30">
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">{t("chat_meta_title")}</h2>
          </div>

          <div className="p-4 space-y-4 text-xs">
            {/* Status & Priority */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-slate-950/40 rounded border border-slate-800/60">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">{t("dash_table_status")}</span>
                <span className={`font-semibold mt-0.5 block ${
                  ticket.status === "OPEN" ? "text-amber-400" : "text-emerald-400"
                }`}>
                  {ticket.status === "OPEN" ? t("chat_status_open") : t("chat_status_resolved")}
                </span>
              </div>

              <div className="p-2.5 bg-slate-950/40 rounded border border-slate-800/60">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">{t("dash_table_priority")}</span>
                <span className="font-semibold text-slate-200 mt-0.5 block">
                  {ticket.priority}
                </span>
              </div>
            </div>

            {/* Category & Tier */}
            <div className="space-y-2 border-t border-slate-800/60 pt-3">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">{t("dash_table_category")}</span>
                <span className="font-medium text-slate-200 mt-0.5 block">{TICKET_KNOWLEDGE[ticket.id]?.category?.[lang] || ticket.category}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">{t("dash_table_level")}</span>
                <span className={`font-semibold mt-0.5 block ${
                  ticket.difficulty === "N1" ? "text-emerald-400" :
                  ticket.difficulty === "N2" ? "text-amber-400" : "text-rose-400"
                }`}>
                  {t("dash_level_prefix")} {ticket.difficulty}
                </span>
              </div>
            </div>

            {/* Requester Profile */}
            <div className="border-t border-slate-800/60 pt-3 space-y-2">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">{t("chat_user_profile")}</span>
              <div className="p-2.5 bg-slate-950/40 rounded border border-slate-800/60">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">{ticket.user_profile}</span>
                  <span className="text-[10px] font-mono text-slate-500">ID: USR-829</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  {t("chat_behavior_note")}
                </p>
              </div>
            </div>

            {/* TryHackMe Style: Didactic Troubleshooting Toolkit & Cheatsheet */}
            {(() => {
              const guide = TICKET_KNOWLEDGE[ticket.id];
              return (
                <div className="border-t border-slate-800/60 pt-3 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-blue-400 uppercase font-bold flex items-center space-x-1.5">
                      <span className="p-0.5 rounded bg-blue-500/10 text-blue-400">💡</span>
                      <span>{t("chat_guide_title")}</span>
                    </span>
                  </div>

                  {guide && (
                    <div className="space-y-3">
                      {/* What is happening */}
                      <div className="p-2.5 bg-slate-950/50 rounded border border-slate-800 text-[11px] space-y-1">
                        <span className="font-bold text-slate-300 block">{t("chat_guide_what_happening")}</span>
                        <p className="text-slate-400 leading-normal">{guide.whatIsHappening[language as "pt" | "en" | "es"]}</p>
                      </div>

                      {/* Golden question */}
                      <div className="p-2.5 bg-amber-500/10 rounded border border-amber-500/20 text-[11px] space-y-1">
                        <span className="font-bold text-amber-400 block">{t("chat_guide_golden_question")}</span>
                        <p className="italic text-slate-200">"{guide.goldenQuestion[language as "pt" | "en" | "es"]}"</p>
                        <button
                          type="button"
                          onClick={() => setInput(guide.goldenQuestion[language as "pt" | "en" | "es"])}
                          className="mt-1 text-[10px] text-amber-300 hover:text-amber-200 underline font-semibold block"
                        >
                          {t("chat_guide_copy_btn")}
                        </button>
                      </div>

                      {/* How to solve */}
                      <div className="p-2.5 bg-emerald-950/30 rounded border border-emerald-500/20 text-[11px] space-y-1">
                        <span className="font-bold text-emerald-400 block">{t("chat_guide_solution")}</span>
                        <p className="text-slate-300 leading-normal">{guide.howToSolve[language as "pt" | "en" | "es"]}</p>
                      </div>

                      {/* Commands Cheatsheet */}
                      {guide.commandsCheatSheet.length > 0 && (
                        <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-[11px] space-y-1.5">
                          <span className="font-bold text-slate-300 block">{t("chat_guide_commands")}</span>
                          <div className="space-y-1 font-mono text-[10px]">
                            {guide.commandsCheatSheet.map((item, idx) => (
                              <div key={idx} className="flex flex-col">
                                <span className="text-amber-300 font-bold">{item.cmd}</span>
                                <span className="text-slate-500 text-[9px] font-sans">{item.desc[language as "pt" | "en" | "es"]}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Resolve Ticket Modal */}
      {showResolveModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-100">
          <div className="bg-[#0f141f] border border-slate-800 rounded max-w-lg w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-bold text-sm text-slate-100 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{t("chat_modal_title")}</span>
              </h2>
              <button
                onClick={() => setShowResolveModal(false)}
                className="text-slate-500 hover:text-slate-300 text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleResolveSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t("chat_modal_label")}
                </label>
                <textarea
                  required
                  rows={4}
                  value={diagnosisInput}
                  onChange={(e) => setDiagnosisInput(e.target.value)}
                  placeholder={t("chat_modal_placeholder")}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                ></textarea>
                <span className="text-[10px] text-slate-500 block mt-1">
                  {t("chat_modal_disclaimer")}
                </span>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowResolveModal(false)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 text-xs"
                >
                  {t("chat_modal_cancel")}
                </button>
                <button
                  type="submit"
                  disabled={resolving || !diagnosisInput.trim()}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded text-xs transition flex items-center space-x-1.5"
                >
                  {resolving ? t("chat_modal_submitting") : t("chat_modal_submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
