import React, { useEffect, useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ShieldAlert,
} from 'lucide-react';
import { VerificationReport } from '../types/docutrust';

interface TrustScoreRingProps {
  report: VerificationReport;
}

export const TrustScoreRing: React.FC<TrustScoreRingProps> = ({ report }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showWhyPanel, setShowWhyPanel] = useState(false);

  useEffect(() => {
    let frameId: number;
    const duration = 750;
    const startTime = performance.now();
    const target = report.score;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(target * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [report.id, report.score]);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (Math.min(100, Math.max(0, animatedScore)) / 100) * circumference;

  const getVerdictStyle = () => {
    switch (report.verdict) {
      case 'Looks authentic':
        return {
          stroke: '#16A34A',
          textClass: 'text-[#16A34A]',
          bgClass: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900',
          icon: <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />,
        };
      case 'Needs review':
        return {
          stroke: '#D97706',
          textClass: 'text-[#D97706]',
          bgClass: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900',
          icon: <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0" />,
        };
      case 'Likely tampered':
        return {
          stroke: '#DC2626',
          textClass: 'text-[#DC2626]',
          bgClass: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900',
          icon: <AlertOctagon className="w-5 h-5 text-[#DC2626] shrink-0" />,
        };
      case 'Inconclusive':
      default:
        return {
          stroke: '#6B7280',
          textClass: 'text-stone-600 dark:text-slate-300',
          bgClass: 'bg-stone-100 dark:bg-slate-800/70 border-stone-300 dark:border-slate-700',
          icon: <HelpCircle className="w-5 h-5 text-stone-600 dark:text-slate-300 shrink-0" />,
        };
    }
  };

  const style = getVerdictStyle();

  return (
    <div className="bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: SVG Score Ring + Verdict */}
        <div className="flex items-center gap-5">
          <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke="currentColor"
                strokeWidth="10"
                className="text-stone-200 dark:text-slate-800"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke={style.stroke}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span
                data-testid="trust-score-value"
                className="font-mono text-3xl font-bold text-stone-900 dark:text-white"
              >
                {animatedScore}
              </span>
              <span className="text-[11px] text-stone-500 dark:text-slate-400 font-mono">
                / 100
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-slate-400">
              <span>TRUST VERDICT</span>
              <span aria-hidden="true">·</span>
              <span>Confidence: {report.confidence}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">ID: {report.reportId}</span>
            </div>

            <div className="flex items-center gap-2">
              {style.icon}
              <h2
                data-testid="verdict-band-heading"
                className={`text-2xl font-bold tracking-tight ${style.textClass}`}
              >
                {report.verdict}
              </h2>
            </div>

            <p className="text-sm text-stone-700 dark:text-slate-300 max-w-2xl leading-relaxed">
              {report.oneSentenceVerdict}
            </p>
          </div>
        </div>

        {/* Right: Why this score toggle */}
        <div className="flex flex-col items-start md:items-end justify-between gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowWhyPanel((prev) => !prev)}
            aria-expanded={showWhyPanel}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-stone-300 dark:border-slate-700 text-stone-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            Why this score?
            {showWhyPanel ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
          <span className="text-[11px] text-stone-500 dark:text-slate-400">
            High score does not guarantee legal authenticity (FR-T4)
          </span>
        </div>
      </div>

      {/* Hard-Fail Rule Banner (FR-S3) */}
      {report.hardFailTriggered && (
        <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <p className="font-semibold text-red-900 dark:text-red-200">
              Hard-Fail Rule Triggered (Score Capped at ≤ 40 per FR-S3)
            </p>
            <ul className="list-disc list-inside text-red-800 dark:text-red-300 space-y-0.5">
              {report.hardFailReasons.map((reason, idx) => (
                <li key={idx}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Why This Score? Module Breakdown Panel (FR-S4 & Section 12) */}
      {showWhyPanel && (
        <div className="pt-4 border-t border-stone-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-stone-900 dark:text-slate-200">
              Weighted Forensic Module Breakdown
            </h3>
            <span className="text-xs text-stone-500 dark:text-slate-400">
              Weights renormalize automatically when a module is not applicable
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {report.modules.map((mod) => {
              const barColor = !mod.applicable
                ? 'bg-stone-300 dark:bg-slate-700'
                : mod.score >= 80
                ? 'bg-[#16A34A]'
                : mod.score >= 50
                ? 'bg-[#D97706]'
                : 'bg-[#DC2626]';

              return (
                <div
                  key={mod.id}
                  className="p-3 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50/60 dark:bg-slate-900/50 flex flex-col justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-stone-900 dark:text-slate-100 truncate">
                        {mod.name}
                      </span>
                      <span className="font-mono text-[11px] text-stone-500 dark:text-slate-400 shrink-0">
                        {mod.weight}% wt
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-slate-400 mt-1 line-clamp-2">
                      {mod.summary}
                    </p>
                  </div>

                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-stone-500 dark:text-slate-400">
                        {mod.applicable ? `${mod.confidence} conf.` : 'N/A (Renormalized)'}
                      </span>
                      <span className="font-bold text-stone-900 dark:text-white">
                        {mod.applicable ? `${mod.score}/100` : '—'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${barColor}`}
                        style={{ width: mod.applicable ? `${mod.score}%` : '0%' }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
