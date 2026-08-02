"use client";

import { useEffect, useState } from "react";
import { api, Settings } from "@/lib/api";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    api.getSettings()
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage({
          text: "Erro ao carregar configurações. O backend está ativo?",
          type: "error",
        });
        setLoading(false);
      });
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setMessage(null);

    api.updateSettings(settings)
      .then((updated) => {
        setSettings(updated);
        setMessage({ text: "Configurações salvas com sucesso!", type: "success" });
        setSaving(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage({ text: "Erro ao salvar configurações no servidor.", type: "error" });
        setSaving(false);
      });
  };

  const handleResetDB = () => {
    if (!confirm("Tem certeza que deseja resetar todos os dados? Isso apagará seu histórico de chamados, mensagens e configurações, restaurando os 10 chamados originais.")) {
      return;
    }

    setResetting(true);
    setMessage(null);

    api.resetDatabase()
      .then((res) => {
        setMessage({ text: "Banco de dados resetado e semeado com sucesso!", type: "success" });
        // Reload settings
        return api.getSettings();
      })
      .then((updated) => {
        if (updated) setSettings(updated);
        setResetting(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage({ text: "Erro ao resetar o banco de dados.", type: "error" });
        setResetting(false);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm">Carregando configurações...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Configurações</h1>
        <p className="text-slate-400 mt-1">Configure o motor de Inteligência Artificial e limpe os dados locais.</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg border text-sm flex items-center space-x-3 ${
          message.type === "success" 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
            : "bg-red-500/10 border-red-500/20 text-red-400"
        }`}>
          {message.type === "success" ? (
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Configuration Form */}
      <form onSubmit={handleSave} className="glass-panel p-6 space-y-6">
        <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Motor de Simulação de IA</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Provider */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Provedor de IA</label>
            <select
              value={settings?.provider}
              onChange={(e) => setSettings(settings ? { ...settings, provider: e.target.value } : null)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            >
              <option value="mock">Simulador Local Estático (Sem API Key / Offline)</option>
              <option value="openai">OpenAI (Nuvem)</option>
              <option value="ollama">Ollama / Outros Provedores Locais (Compatíveis)</option>
            </select>
            <p className="text-[11px] text-slate-500">
              O simulador local estático não exige internet ou API Key. Ele usa regras e palavras-chave.
            </p>
          </div>

          {/* Model */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Modelo LLM</label>
            <input
              type="text"
              value={settings?.model || ""}
              onChange={(e) => setSettings(settings ? { ...settings, model: e.target.value } : null)}
              placeholder="e.g. gpt-4o-mini ou llama3"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            />
            <p className="text-[11px] text-slate-500">
              Nome exato do modelo a ser chamado na API (ex: `gpt-4o-mini` para OpenAI).
            </p>
          </div>
        </div>

        {/* Dynamic inputs based on provider */}
        {settings?.provider === "openai" && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Chave de API OpenAI (sk-...)</label>
            <input
              type="password"
              value={settings?.api_key || ""}
              onChange={(e) => setSettings(settings ? { ...settings, api_key: e.target.value } : null)}
              placeholder="Insira sua chave sk-..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            />
            <p className="text-[11px] text-slate-500">
              Sua chave de API é transmitida e armazenada apenas localmente no banco SQLite.
            </p>
          </div>
        )}

        {settings?.provider === "ollama" && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Base URL do Endpoint Local</label>
            <input
              type="text"
              value={settings?.base_url || ""}
              onChange={(e) => setSettings(settings ? { ...settings, base_url: e.target.value } : null)}
              placeholder="e.g. http://localhost:11434/v1"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            />
            <p className="text-[11px] text-slate-500">
              Caso esteja rodando o Ollama localmente, a URL padrão geralmente é `http://localhost:11434/v1`.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Temperature */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">Temperatura: {settings?.temperature}</label>
              <span className="text-[10px] text-slate-500">Mais criativo / Mais estável</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.1"
              value={settings?.temperature || 0.7}
              onChange={(e) => setSettings(settings ? { ...settings, temperature: parseFloat(e.target.value) } : null)}
              className="w-full accent-indigo-600 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Temperaturas mais baixas geram respostas mais previsíveis e adequadas às regras.
            </p>
          </div>

          {/* Simulation Mode */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Modo de Simulação</label>
            <select
              value={settings?.simulation_mode}
              onChange={(e) => setSettings(settings ? { ...settings, simulation_mode: e.target.value } : null)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            >
              <option value="normal">Normal (Respostas imediatas)</option>
              <option value="realista">Realista (Pequeno atraso de digitação na IA)</option>
            </select>
            <p className="text-[11px] text-slate-500">
              O modo realista simula o tempo de digitação de um usuário final humano.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800/60">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white font-bold text-sm rounded-lg shadow-lg shadow-indigo-600/10 transition"
          >
            {saving ? "Salvando..." : "Salvar Configurações"}
          </button>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="glass-panel p-6 border-red-950/40 bg-red-950/5 space-y-4">
        <h2 className="text-lg font-bold text-red-400 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Zona de Perigo
        </h2>
        <p className="text-xs text-slate-400">
          Esta ação apagará de forma irreversível todos os chamados criados localmente, mensagens de chat, notas de avaliação, e redefinirá as configurações para o modo de simulação padrão estático.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={handleResetDB}
            disabled={resetting}
            className="px-4 py-2 bg-red-950 hover:bg-red-900 text-red-200 border border-red-900/50 font-bold text-xs rounded-lg transition"
          >
            {resetting ? "Resetando..." : "Resetar Banco de Dados"}
          </button>
        </div>
      </div>
    </div>
  );
}
