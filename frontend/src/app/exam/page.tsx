"use client";

import { useState } from "react";
import Link from "next/link";
import { COMPTIA_CORE1_EXAM, ExamQuestion } from "@/lib/examData";
import { useI18n } from "@/lib/i18n";

export default function ExamPage() {
  const { t, language } = useI18n();
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [examFinished, setExamFinished] = useState<boolean>(false);

  const filteredQuestions: ExamQuestion[] = selectedDomain === "ALL"
    ? COMPTIA_CORE1_EXAM
    : COMPTIA_CORE1_EXAM.filter((q) => q.domain === selectedDomain);

  const currentQ: ExamQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];
  const totalQ = filteredQuestions.length;

  const handleSelectOption = (optionId: "A" | "B" | "C" | "D") => {
    if (examFinished) return;
    setUserAnswers({
      ...userAnswers,
      [currentQ.id]: optionId,
    });
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < totalQ - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setExamFinished(true);
    }
  };

  const handlePrev = () => {
    setShowExplanation(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRestart = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setShowExplanation(false);
    setExamFinished(false);
  };

  // Score calculations (CompTIA scale 100 to 900, passing is 675)
  const answeredCount = Object.keys(userAnswers).length;
  let correctCount = 0;
  COMPTIA_CORE1_EXAM.forEach((q) => {
    if (userAnswers[q.id] === q.correctOption) {
      correctCount += 1;
    }
  });

  const percentage = Math.round((correctCount / COMPTIA_CORE1_EXAM.length) * 100);
  // Scale from 100 to 900
  const scaledScore = 100 + Math.round((correctCount / COMPTIA_CORE1_EXAM.length) * 800);
  const isPassed = scaledScore >= 675;

  const domains = [
    { id: "ALL", name: t("exam_domain_all") },
    { id: "1.0 Mobile Devices", name: t("exam_domain_1") },
    { id: "2.0 Networking", name: t("exam_domain_2") },
    { id: "3.0 Hardware", name: t("exam_domain_3") },
    { id: "4.0 Virtualization & Cloud", name: t("exam_domain_4") },
    { id: "5.0 Troubleshooting & Security", name: t("exam_domain_5") },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold uppercase tracking-wider">
              {t("exam_badge")}
            </span>
            <span className="text-[10px] text-amber-400 font-mono font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              {t("exam_v15_badge")}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">{t("exam_title")}</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t("exam_subtitle")}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleRestart}
            className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition"
          >
            {t("exam_restart_btn")}
          </button>
        </div>
      </div>

      {/* Domain Filters */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
        {domains.map((d) => {
          const isSelected = selectedDomain === d.id;
          return (
            <button
              key={d.id}
              onClick={() => {
                setSelectedDomain(d.id);
                setCurrentIndex(0);
                setShowExplanation(false);
              }}
              className={`px-3 py-1.5 rounded font-semibold whitespace-nowrap transition ${
                isSelected
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {d.name}
            </button>
          );
        })}
      </div>

      {/* Results View when Finished */}
      {examFinished ? (
        <div className="bg-[#0f141f] border border-slate-800 rounded-xl p-8 space-y-6 text-center max-w-2xl mx-auto shadow-xl">
          <div className="space-y-2">
            <span className="text-3xl">{isPassed ? "🎉" : "📚"}</span>
            <h3 className="text-xl font-bold text-slate-100">
              {isPassed ? t("exam_result_pass") : t("exam_result_fail")}
            </h3>
            <p className="text-xs text-slate-400">
              {t("exam_cutoff_label")} <b>675</b> {t("exam_scale_label")}
            </p>
          </div>

          {/* Score Card */}
          <div className="grid grid-cols-3 gap-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
            <div>
              <span className="text-[11px] text-slate-500 block uppercase font-bold">{t("exam_score_label")}</span>
              <span className={`text-2xl font-bold font-mono ${isPassed ? "text-emerald-400" : "text-amber-400"}`}>
                {scaledScore}
              </span>
              <span className="text-[10px] text-slate-500 block">{t("exam_score_of")}</span>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 block uppercase font-bold">{t("exam_accuracy_label")}</span>
              <span className="text-2xl font-bold text-slate-200 font-mono">
                {percentage}%
              </span>
              <span className="text-[10px] text-slate-500 block">{correctCount} {t("fc_of")} {totalQ} {t("exam_correct_label")}</span>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 block uppercase font-bold">{t("exam_result_label")}</span>
              <span className={`text-sm font-bold uppercase px-2 py-1 rounded inline-block mt-1 ${
                isPassed ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
              }`}>
                {isPassed ? "PASS" : "FAIL"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition"
            >
              {t("exam_new_test_btn")}
            </button>
            <Link
              href="/fundamentals"
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded-lg border border-slate-800 transition"
            >
              {t("exam_review_btn")}
            </Link>
          </div>
        </div>
      ) : (
        /* Active Question Card */
        currentQ && (
          <div className="space-y-4">
            {/* Question Header & Progress Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <span>{t("exam_question_counter")} <b>{currentIndex + 1}</b> {t("fc_of")} <b>{totalQ}</b></span>
                <span>•</span>
                <span className="text-rose-400 font-semibold">{domains.find(d => d.id === currentQ.domain)?.name || currentQ.domain}</span>
                <span>•</span>
                <span className="text-slate-500 font-mono text-[11px]">{currentQ.domainCode}</span>
              </div>

              <span className="font-mono text-slate-500">
                {t("exam_answered")}: {answeredCount}/{totalQ}
              </span>
            </div>

            <div className="w-full bg-slate-900 rounded-full h-1.5 border border-slate-800 overflow-hidden">
              <div
                className="bg-rose-500 h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQ) * 100}%` }}
              ></div>
            </div>

            {/* Question Body */}
            <div className="bg-[#0f141f] border border-slate-800 rounded-xl p-6 space-y-5 shadow-lg">
              {/* Scenario Context */}
              {currentQ.scenario && (
                <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-sans">
                  <span className="font-bold text-amber-400 block mb-1">{t("exam_scenario_label")}</span>
                  {currentQ.scenario?.[language as 'pt' | 'en' | 'es']}
                </div>
              )}

              {/* Question Text */}
              <h3 className="text-base font-bold text-slate-100 leading-snug">
                {currentQ.question[language as 'pt' | 'en' | 'es']}
              </h3>

              {/* Multiple Choice Options */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt) => {
                  const isSelected = userAnswers[currentQ.id] === opt.id;
                  const isCorrect = currentQ.correctOption === opt.id;

                  let optionStyle = "bg-slate-900/80 hover:bg-slate-800/90 border-slate-800 text-slate-300";
                  if (isSelected) {
                    optionStyle = "bg-blue-600/20 border-blue-500/50 text-blue-200 font-semibold";
                  }
                  if (showExplanation) {
                    if (isCorrect) {
                      optionStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-200 font-semibold";
                    } else if (isSelected && !isCorrect) {
                      optionStyle = "bg-rose-500/20 border-rose-500/50 text-rose-200";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-3.5 rounded-lg border text-xs transition flex items-start space-x-3 ${optionStyle}`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 ${
                        isSelected ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}>
                        {opt.id}
                      </span>
                      <span className="leading-relaxed">{opt.text[language as 'pt' | 'en' | 'es']}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box when Revealed */}
              {showExplanation && (
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">{t("exam_official_answer")} {currentQ.correctOption}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[10px] text-slate-500 font-mono">{currentQ.objectiveRef}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentQ.explanation[language as 'pt' | 'en' | 'es']}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation & Action Buttons */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 font-semibold text-xs rounded-lg border border-slate-800 transition"
              >
                {t("exam_prev_btn")}
              </button>

              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-semibold text-xs rounded-lg border border-amber-500/30 transition flex items-center space-x-1.5"
              >
                <span>{showExplanation ? t("exam_hide_expl") : t("exam_show_expl")}</span>
              </button>

              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition shadow-md flex items-center space-x-1.5"
              >
                <span>{currentIndex === totalQ - 1 ? t("exam_finish_btn") : t("exam_next_btn")}</span>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
