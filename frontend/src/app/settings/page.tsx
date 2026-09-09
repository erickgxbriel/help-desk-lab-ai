"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, Settings } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

export default function SettingsPage() {
  const { t } = useI18n();
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
          text: t("settings_msg_load_error"),
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
        setMessage({ text: t("settings_msg_saved"), type: "success" });
        setSaving(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage({ text: t("settings_msg_save_error"), type: "error" });
        setSaving(false);
      });
  };

  const handleResetDB = () => {
    if (!confirm(t("settings_reset_confirm"))) {
      return;
    }

    setResetting(true);
    setMessage(null);

    api.resetDatabase()
      .then(() => {
        setMessage({ text: t("settings_msg_reset_success"), type: "success" });
        return api.getSettings();
      })
      .then((updated) => {
        if (updated) setSettings(updated);
        setResetting(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage({ text: t("settings_msg_reset_error"), type: "error" });
        setResetting(false);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 text-xs">{t("settings_loading")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Top Header / Breadcrumb */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <Link href="/" className="hover:text-slate-300">{t("dash_title")}</Link>
            <span>/</span>
            <span className="text-slate-400">{t("settings_breadcrumb")}</span>
          </div>
          <h1 className="text-lg font-semibold text-slate-100">{t("settings_title")}</h1>
        </div>
      </div>

      {message && (
        <div className={`p-3 rounded text-xs flex items-center space-x-2 border ${
          message.type === "success" 
            ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400" 
            : "bg-rose-950/20 border-rose-900/60 text-rose-400"
        }`}>
          <span>{message.text}</span>
        </div>
      )}

      {/* Configuration Form */}
      <form onSubmit={handleSave} className="bg-[#0f141f] border border-slate-800/80 rounded p-5 space-y-5">
        <div className="border-b border-slate-800/80 pb-3">
          <h2 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">{t("settings_ai_provider_section")}</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">{t("settings_ai_provider_desc")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Provider */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300">{t("settings_provider_label")}</label>
            <select
              value={settings?.provider}
              onChange={(e) => {
                const newProvider = e.target.value;
                let defaultModel = settings?.model || "";
                if (newProvider === "openai") defaultModel = "gpt-4o-mini";
                if (newProvider === "openrouter") defaultModel = "meta-llama/llama-3.3-70b-instruct";
                if (newProvider === "gemini") defaultModel = "gemini-1.5-flash";
                if (newProvider === "ollama") defaultModel = "llama3:8b";
                setSettings(settings ? { ...settings, provider: newProvider, model: defaultModel } : null);
              }}
              className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition"
            >
              <option value="mock">{t("settings_provider_mock")}</option>
              <option value="openrouter">{t("settings_provider_openrouter")}</option>
              <option value="gemini">{t("settings_provider_gemini")}</option>
              <option value="openai">{t("settings_provider_openai")}</option>
              <option value="ollama">{t("settings_provider_ollama")}</option>
            </select>
            <p className="text-[11px] text-slate-500">
              {settings?.provider === "openrouter" && t("settings_hint_openrouter")}
              {settings?.provider === "gemini" && t("settings_hint_gemini")}
              {settings?.provider === "openai" && t("settings_hint_openai")}
              {settings?.provider === "ollama" && t("settings_hint_ollama")}
              {settings?.provider === "mock" && t("settings_hint_mock")}
            </p>
          </div>

          {/* Model */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300">{t("settings_model_label")}</label>
            <input
              type="text"
              value={settings?.model || ""}
              onChange={(e) => setSettings(settings ? { ...settings, model: e.target.value } : null)}
              placeholder={
                settings?.provider === "openrouter" ? "e.g. meta-llama/llama-3.3-70b-instruct" :
                settings?.provider === "gemini" ? "e.g. gemini-1.5-flash" :
                settings?.provider === "ollama" ? "e.g. llama3:8b" :
                "e.g. gpt-4o-mini"
              }
              className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition"
            />
            <p className="text-[11px] text-slate-500">
              {t("settings_model_desc")} {
                settings?.provider === "openrouter" ? "`meta-llama/llama-3.3-70b-instruct`" :
                settings?.provider === "gemini" ? "`gemini-1.5-flash`" :
                settings?.provider === "ollama" ? "`llama3:8b`" :
                "`gpt-4o-mini`"
              }).
            </p>
          </div>
        </div>

        {/* Dynamic Provider fields */}
        {settings?.provider === "openrouter" && (
          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-slate-300">{t("settings_key_openrouter")}</label>
            <input
              type="password"
              value={settings?.api_key || ""}
              onChange={(e) => setSettings(settings ? { ...settings, api_key: e.target.value } : null)}
              placeholder="sk-or-v1-..."
              className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition"
            />
            <p className="text-[11px] text-slate-500">
              {t("settings_get_key_at")} <span className="text-blue-400 font-mono">openrouter.ai/keys</span>.
            </p>
          </div>
        )}

        {settings?.provider === "gemini" && (
          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-slate-300">{t("settings_key_gemini")}</label>
            <input
              type="password"
              value={settings?.api_key || ""}
              onChange={(e) => setSettings(settings ? { ...settings, api_key: e.target.value } : null)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition"
            />
            <p className="text-[11px] text-slate-500">
              {t("settings_get_free_key_at")} <span className="text-blue-400 font-mono">aistudio.google.com/app/apikey</span>.
            </p>
          </div>
        )}

        {settings?.provider === "openai" && (
          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-slate-300">{t("settings_key_openai")}</label>
            <input
              type="password"
              value={settings?.api_key || ""}
              onChange={(e) => setSettings(settings ? { ...settings, api_key: e.target.value } : null)}
              placeholder="sk-..."
              className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition"
            />
            <p className="text-[11px] text-slate-500">
              {t("settings_key_security_notice")}
            </p>
          </div>
        )}

        {settings?.provider === "ollama" && (
          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-slate-300">{t("settings_url_ollama")}</label>
            <input
              type="text"
              value={settings?.base_url || ""}
              onChange={(e) => setSettings(settings ? { ...settings, base_url: e.target.value } : null)}
              placeholder="http://localhost:11434/v1"
              className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs border-t border-slate-800/80 pt-4">
          {/* Temperature */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-slate-300">{t("settings_temperature")} {settings?.temperature}</label>
              <span className="text-[10px] text-slate-500">{t("settings_temperature_hint")}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.1"
              value={settings?.temperature || 0.7}
              onChange={(e) => setSettings(settings ? { ...settings, temperature: parseFloat(e.target.value) } : null)}
              className="w-full accent-blue-600 h-1.5 bg-slate-800 rounded appearance-none cursor-pointer"
            />
          </div>

          {/* Simulation Mode */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300">{t("settings_response_mode")}</label>
            <select
              value={settings?.simulation_mode}
              onChange={(e) => setSettings(settings ? { ...settings, simulation_mode: e.target.value } : null)}
              className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition"
            >
              <option value="normal">{t("settings_mode_instant")}</option>
              <option value="realista">{t("settings_mode_realistic")}</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-800/80">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-semibold text-xs rounded transition shadow-sm"
          >
            {saving ? t("settings_saving_btn") : t("settings_save_btn")}
          </button>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="bg-[#0f141f] border border-rose-900/40 rounded p-5 space-y-3">
        <h2 className="text-xs font-semibold text-rose-400 uppercase tracking-wider">{t("settings_reset_title")}</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          {t("settings_reset_desc")}
        </p>
        <div>
          <button
            type="button"
            onClick={handleResetDB}
            disabled={resetting}
            className="px-3.5 py-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-200 border border-rose-800/60 font-semibold text-xs rounded transition"
          >
            {resetting ? t("settings_resetting_btn") : t("settings_reset_btn")}
          </button>
        </div>
      </div>
    </div>
  );
}
