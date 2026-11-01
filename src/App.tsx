import React, { useEffect, useState } from 'react';
import { FileSearch, History, Moon, Scale, ShieldCheck, Sun } from 'lucide-react';
import {
  LegalDocumentAnalysis,
  RetentionPolicy,
  SupportedLanguageCode,
  VerificationReport,
} from './types/docutrust';
import { VERIFICATION_SAMPLES } from './data/verificationSamples';
import {
  LEGAL_SAMPLES,
  UI_CHROME_TRANSLATIONS,
} from './data/legalSamples';
import { LandingHomeView } from './components/LandingHomeView';
import { VerifyWorkspace } from './components/VerifyWorkspace';
import { UnderstandWorkspace } from './components/UnderstandWorkspace';
import { CompareAndPrivacyView } from './components/CompareAndPrivacyView';
import { VaultAndApiConsole } from './components/VaultAndApiConsole';

type ActiveScreen = 'home' | 'verify' | 'understand' | 'compare' | 'vault';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1' || params.get('view') === 'verify') return 'verify';
    if (params.get('view') === 'understand') return 'understand';
    return 'home';
  });
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<SupportedLanguageCode>('en');
  const [retention, setRetention] = useState<RetentionPolicy>('delete_after_check');
  const [reports, setReports] = useState<VerificationReport[]>(VERIFICATION_SAMPLES);
  const [activeReport, setActiveReport] = useState<VerificationReport>(VERIFICATION_SAMPLES[0]);
  const [legalDocs, setLegalDocs] = useState<LegalDocumentAnalysis[]>(LEGAL_SAMPLES);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocumentAnalysis>(LEGAL_SAMPLES[0]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleAddReport = (report: VerificationReport) => setReports((prev) => [report, ...prev]);
  const handleDeleteReport = (reportId: string) => {
    setReports((prev) => {
      const remaining = prev.filter((report) => report.id !== reportId);
      if (activeReport.id === reportId && remaining.length) setActiveReport(remaining[0]);
      return remaining.length ? remaining : VERIFICATION_SAMPLES;
    });
  };
  const handleDeleteAllHistory = () => {
    setReports([VERIFICATION_SAMPLES[3]]);
    setActiveReport(VERIFICATION_SAMPLES[3]);
  };
  const handleAddCustomLegalDoc = (doc: LegalDocumentAnalysis) => setLegalDocs((prev) => [doc, ...prev]);
  const t = UI_CHROME_TRANSLATIONS[language] || UI_CHROME_TRANSLATIONS.en;

  const navItems = [
    { id: 'home' as const, label: 'Home' },
    { id: 'verify' as const, label: 'Verify', icon: FileSearch },
    { id: 'understand' as const, label: 'Legal Simplifier', icon: Scale },
    { id: 'vault' as const, label: 'History', icon: History },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0B0F14] text-[#17211F] dark:text-[#F3F4F6] transition-colors">
      <header className="sticky top-0 z-40 border-b border-stone-200/80 dark:border-slate-800 bg-white/95 dark:bg-[#111722]/95 backdrop-blur px-4 sm:px-8">
        <div className="max-w-7xl mx-auto h-[68px] flex items-center justify-between gap-4">
          <button onClick={() => setActiveScreen('home')} className="flex items-center gap-2.5 shrink-0" aria-label="DocuTrust AI home">
            <span className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center"><ShieldCheck className="w-5 h-5" /></span>
            <span className="text-lg font-bold tracking-tight text-stone-900 dark:text-white">DocuTrust <span className="text-teal-700 dark:text-teal-400">AI</span></span>
          </button>

          <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeScreen === item.id;
              return (
                <button key={item.id} onClick={() => setActiveScreen(item.id)}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active ? 'bg-teal-50 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'}`}>
                  {Icon && <Icon className="w-4 h-4" />}{item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setDarkMode((value) => !value)} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-stone-200 dark:border-slate-700 text-stone-600 dark:text-slate-300 hover:bg-stone-50 dark:hover:bg-slate-800">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setActiveScreen('verify')} className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 transition-colors">
              <FileSearch className="w-4 h-4" /> New check
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-7 sm:py-10">
        {activeScreen === 'home' && <LandingHomeView language={language} onStartVerify={() => setActiveScreen('verify')} onStartUnderstand={() => setActiveScreen('understand')} onStartCompare={() => setActiveScreen('compare')} recentReports={reports} onOpenReport={(report) => { setActiveReport(report); setActiveScreen('verify'); }} />}
        {activeScreen === 'verify' && <VerifyWorkspace reports={reports} activeReport={activeReport} onSelectReport={setActiveReport} onAddReport={handleAddReport} onDeleteReport={handleDeleteReport} onOpenCompare={() => setActiveScreen('compare')} disclaimerText={t.disclaimer} />}
        {activeScreen === 'understand' && <UnderstandWorkspace legalDocs={legalDocs} activeDoc={activeLegalDoc} onSelectDoc={setActiveLegalDoc} onAddCustomDoc={handleAddCustomLegalDoc} language={language} onChangeLanguage={setLanguage} disclaimerText={t.disclaimer} />}
        {activeScreen === 'compare' && <CompareAndPrivacyView />}
        {activeScreen === 'vault' && <VaultAndApiConsole reports={reports} onSelectReportAndNavigate={(report) => { setActiveReport(report); setActiveScreen('verify'); }} onDeleteReport={handleDeleteReport} onDeleteAllHistory={handleDeleteAllHistory} retention={retention} onChangeRetention={setRetention} />}
      </main>

      <footer className="mt-8 border-t border-stone-200 dark:border-slate-800 bg-white dark:bg-[#111722] px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-500 dark:text-slate-400">
          <span>© 2026 DocuTrust AI · Verify. Understand. Decide.</span>
          <span className="max-w-2xl leading-relaxed">Results are automated indicators, not proof of authenticity or forgery, and are not legal advice. Confirm important documents with the issuing authority.</span>
        </div>
      </footer>
    </div>
  );
}
