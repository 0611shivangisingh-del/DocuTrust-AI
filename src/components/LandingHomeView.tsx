import React from 'react';
import { ArrowRight, FileSearch, FileText, History, Scale, ShieldCheck, Sparkles } from 'lucide-react';
import { SupportedLanguageCode, VerificationReport } from '../types/docutrust';

interface LandingHomeViewProps {
  language: SupportedLanguageCode;
  onStartVerify: () => void;
  onStartUnderstand: () => void;
  onStartCompare: () => void;
  recentReports: VerificationReport[];
  onOpenReport: (report: VerificationReport) => void;
}

export const LandingHomeView: React.FC<LandingHomeViewProps> = ({
  onStartVerify, onStartUnderstand, onStartCompare, recentReports, onOpenReport,
}) => {
  const recent = recentReports.slice(0, 3);

  const verdictStyle = (verdict: VerificationReport['verdict']) => {
    if (verdict === 'Looks authentic') return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300';
    if (verdict === 'Likely tampered') return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300';
    if (verdict === 'Needs review') return 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300';
    if (verdict === 'Inconclusive') return 'bg-stone-100 text-stone-600 dark:bg-slate-800 dark:text-slate-300';
    return 'bg-stone-100 text-stone-600 dark:bg-slate-800 dark:text-slate-300';
  };

  return (
    <div className="space-y-10 sm:space-y-14">
      <section className="relative overflow-hidden rounded-3xl bg-[#102E2B] px-6 py-10 sm:px-10 sm:py-14 text-white">
        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl" />
        <div className="relative max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-teal-100">
            <Sparkles className="h-3.5 w-3.5" /> Simple, secure document intelligence
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight">Documents you can understand and verify.</h1>
          <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-teal-50/80">Check documents for signs of editing and make complex legal language easier to understand — all in one simple workspace.</p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={onStartVerify} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#102E2B] hover:bg-teal-50 transition-colors">Verify a document <ArrowRight className="h-4 w-4" /></button>
            <button onClick={onStartUnderstand} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">Simplify a legal document</button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-400">What would you like to do?</p>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white">Choose a service</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <button onClick={onStartVerify} className="group rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md dark:border-slate-800 dark:bg-[#111722] dark:hover:border-teal-700">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"><FileSearch className="h-6 w-6" /></span>
            <span className="block text-xl font-bold text-stone-900 dark:text-white">Verify a document</span>
            <span className="mt-2 block text-sm leading-relaxed text-stone-600 dark:text-slate-400">Upload a certificate, marksheet or other document to review its visual and structural consistency.</span>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 dark:text-teal-400">Start verification <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </button>
          <button onClick={onStartUnderstand} className="group rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md dark:border-slate-800 dark:bg-[#111722] dark:hover:border-teal-700">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300"><Scale className="h-6 w-6" /></span>
            <span className="block text-xl font-bold text-stone-900 dark:text-white">Simplify a legal document</span>
            <span className="mt-2 block text-sm leading-relaxed text-stone-600 dark:text-slate-400">Understand agreements in plain language, explore important clauses and identify potential risks.</span>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 dark:text-teal-400">Understand a document <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-[#111722]">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2"><History className="h-4 w-4 text-teal-700 dark:text-teal-400" /><h2 className="font-bold text-stone-900 dark:text-white">Recent activity</h2></div>
            <p className="mt-1 text-xs text-stone-500 dark:text-slate-400">Your latest document checks</p>
          </div>
          <button onClick={onStartCompare} className="text-xs font-semibold text-teal-700 hover:text-teal-900 dark:text-teal-400">Compare documents</button>
        </div>
        {recent.length ? (
          <div className="divide-y divide-stone-100 dark:divide-slate-800">
            {recent.map((report) => (
              <button key={report.id} onClick={() => onOpenReport(report)} className="flex w-full items-center gap-3 py-3 text-left hover:bg-stone-50 dark:hover:bg-slate-800/50 rounded-lg px-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-600 dark:bg-slate-800 dark:text-slate-300"><FileText className="h-5 w-5" /></span>
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-stone-800 dark:text-slate-100">{report.documentName}</span><span className="mt-0.5 block text-xs text-stone-500 dark:text-slate-400">{new Date(report.createdAt).toLocaleDateString()}</span></span>
                <span className="hidden sm:inline text-sm font-semibold text-stone-700 dark:text-slate-200">{report.score}/100</span>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${verdictStyle(report.verdict)}`}>{report.verdict}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-stone-400" />
              </button>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center"><ShieldCheck className="mx-auto h-8 w-8 text-stone-300 dark:text-slate-600" /><p className="mt-2 text-sm font-medium text-stone-700 dark:text-slate-300">No documents checked yet</p><p className="mt-1 text-xs text-stone-500">Your recent activity will appear here.</p></div>
        )}
      </section>

      <p className="text-center text-xs text-stone-500 dark:text-slate-500">Your documents should be reviewed carefully. Automated results are indicators, not official proof of authenticity.</p>
    </div>
  );
};
