import React, { useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  FileText,
  HelpCircle,
  MessageSquare,
  Mic,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  ChatCitationMessage,
  LegalDocumentAnalysis,
  ReadingLevel,
  SupportedLanguageCode,
} from '../types/docutrust';
import { SUPPORTED_LANGUAGES } from '../data/legalSamples';

interface UnderstandWorkspaceProps {
  legalDocs: LegalDocumentAnalysis[];
  activeDoc: LegalDocumentAnalysis;
  onSelectDoc: (doc: LegalDocumentAnalysis) => void;
  onAddCustomDoc: (doc: LegalDocumentAnalysis) => void;
  language: SupportedLanguageCode;
  onChangeLanguage: (lang: SupportedLanguageCode) => void;
  disclaimerText: string;
}

export const UnderstandWorkspace: React.FC<UnderstandWorkspaceProps> = ({
  legalDocs,
  activeDoc,
  onSelectDoc,
  onAddCustomDoc,
  language,
  onChangeLanguage,
  disclaimerText,
}) => {
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>('Simple');
  const [activeTab, setActiveTab] = useState<'summary' | 'clauses' | 'risks' | 'ask'>('summary');

  // Audio Read-Aloud state (FR-M4)
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);

  // Custom paste legal text modal/drawer
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customClauseText, setCustomClauseText] = useState('');
  const [isSimplifying, setIsSimplifying] = useState(false);

  // Ask the Document grounded chat state (FR-L5)
  const [chatMessages, setChatMessages] = useState<ChatCitationMessage[]>([
    {
      id: 'msg-init',
      role: 'assistant',
      text: 'Ask any question about this agreement. I answer strictly from the uploaded clauses and cite the exact clause number—or tell you if it is not in the document (FR-L5).',
      citedClauses: ['Clause 4.2', 'Clause 9.1'],
      timestamp: 'Just now',
    },
  ]);
  const [questionInput, setQuestionInput] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState<string | null>(null);

  const currentTranslation =
    activeDoc.translations[language] || activeDoc.translations.en;

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);
    const textToRead = `${currentTranslation.inShortSummary[readingLevel]}. ${currentTranslation.riskFlags
      .map((r) => `${r.clauseNumber}: ${r.title}. ${r.oneLineReason}`)
      .join('. ')}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = langObj?.speechLang || 'en-IN';
    utterance.rate = speechRate;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleAskQuestion = async (presetQuestion?: string) => {
    const query = (presetQuestion ?? questionInput).trim();
    if (!query) return;

    const userMsg: ChatCitationMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: query,
      citedClauses: [],
      timestamp: 'Just now',
    };
    setChatMessages((prev) => [...prev, userMsg]);
    if (!presetQuestion) setQuestionInput('');
    setIsAsking(true);

    try {
      const res = await fetch(`/v1/legal/summaries/${activeDoc.id}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          language,
          clauses: currentTranslation.clauses,
          keyFacts: currentTranslation.keyFacts,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setChatMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            text: data.answer,
            citedClauses: data.citedClauses || [],
            timestamp: 'Just now',
          },
        ]);
      }
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: 'I could not reach the analysis service right now. Please check the Clauses tab directly.',
          citedClauses: [],
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  const handleAnalyzeCustomText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customClauseText.trim()) return;
    setIsSimplifying(true);

    try {
      const res = await fetch('/v1/legal/summaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: customTitle.trim() || 'Uploaded Custom Legal Agreement',
          text: customClauseText.trim(),
          language,
          readingLevel,
        }),
      });
      if (res.ok) {
        const newDoc: LegalDocumentAnalysis = await res.json();
        onAddCustomDoc(newDoc);
        onSelectDoc(newDoc);
        setShowCustomInput(false);
        setCustomTitle('');
        setCustomClauseText('');
      }
    } finally {
      setIsSimplifying(false);
    }
  };

  const handleVoiceQuestionInput = () => {
    setQuestionInput('What happens if I vacate the house before 9 months?');
  };

  return (
    <div className="space-y-6">
      {/* Top Pinned Legal Simplifier Bar: Agreement Selector, Language Picker & Reading Level (FR-L3, FR-M1, FR-M2) */}
      <div className="bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-white">
              Legal Document Simplifier & Multilingual Translator
            </h1>
            <p className="text-xs text-stone-600 dark:text-slate-400 mt-0.5">
              Plain-language summary, clause-by-clause risk flags, Indic translation (keeps English legal terms in brackets per FR-M3), and grounded Q&A.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowCustomInput((s) => !s)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#0F766E] text-white hover:bg-[#0D655E] transition-colors cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              {showCustomInput ? 'Close Custom Input' : 'Paste / Upload Legal Text'}
            </button>

            {/* Audio Read-Aloud Controls (FR-M4) */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-800">
              <button
                type="button"
                onClick={handleToggleSpeech}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-800 dark:text-slate-200 cursor-pointer whitespace-nowrap"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#DC2626]" />
                    Stop Audio
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#0F766E]" />
                    Read Aloud
                  </>
                )}
              </button>
              <span aria-hidden="true" className="text-stone-300 dark:text-slate-600">
                |
              </span>
              <select
                aria-label="Audio playback speed"
                value={speechRate}
                onChange={(e) => setSpeechRate( parseFloat(e.target.value) )}
                className="text-[11px] font-mono bg-transparent text-stone-700 dark:text-slate-300 focus:outline-none"
              >
                <option value={0.85}>0.85x</option>
                <option value={1.0}>1.0x</option>
                <option value={1.25}>1.25x</option>
              </select>
            </div>
          </div>
        </div>

        {/* Custom Legal Text Analyzer Form */}
        {showCustomInput && (
          <form
            onSubmit={handleAnalyzeCustomText}
            className="p-4 rounded-xl border border-[#0F766E] bg-stone-50 dark:bg-slate-900 space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="custom-legal-title"
                  className="block text-xs font-medium text-stone-700 dark:text-slate-300 mb-1"
                >
                  Agreement Title
                </label>
                <input
                  id="custom-legal-title"
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Commercial Shop Lease / Freelance NDA"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="custom-legal-clauses"
                className="block text-xs font-medium text-stone-700 dark:text-slate-300 mb-1"
              >
                Paste Legal Clauses or Contract Text
              </label>
              <textarea
                id="custom-legal-clauses"
                rows={4}
                required
                value={customClauseText}
                onChange={(e) => setCustomClauseText(e.target.value)}
                placeholder="Paste contract clauses here (e.g., 'The Borrower agrees that the Lender may revise the interest rate at any time without notice and forfeit the security deposit...')"
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                disabled={isSimplifying}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#0F766E] text-white hover:bg-[#0D655E] disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isSimplifying ? 'Simplifying Clauses...' : 'Analyze & Simplify Agreement'}
              </button>
            </div>
          </form>
        )}

        {/* Controls Strip: Sample Agreement + Language Selector + Reading Level Toggle */}
        <div className="pt-3 border-t border-stone-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          {/* Document Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {legalDocs.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => onSelectDoc(doc)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  doc.id === activeDoc.id
                    ? 'border-[#0F766E] bg-[#0F766E]/10 text-[#0F766E] dark:text-teal-300 font-semibold'
                    : 'border-stone-200 dark:border-slate-800 text-stone-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800'
                }`}
              >
                {doc.title}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Language Switcher (12 Indian Languages) */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="legal-lang-select"
                className="text-xs font-medium text-stone-600 dark:text-slate-400"
              >
                Output Language:
              </label>
              <select
                id="legal-lang-select"
                value={language}
                onChange={(e) => onChangeLanguage(e.target.value as SupportedLanguageCode)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.nameNative} ({l.nameEnglish}) — {l.tier}
                  </option>
                ))}
              </select>
            </div>

            {/* Reading Level Toggle (FR-L3: Simple, Standard, Detailed) */}
            <div
              role="group"
              aria-label="Reading level selector"
              className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-slate-800 rounded-lg"
            >
              {(['Simple', 'Standard', 'Detailed'] as ReadingLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setReadingLevel(level)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    readingLevel === level
                      ? 'bg-white dark:bg-slate-900 text-stone-900 dark:text-white shadow-xs'
                      : 'text-stone-600 dark:text-slate-400 hover:text-stone-900'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Key Screen 7.4 #6: Summary, Clauses, Risks, Ask) */}
      <div className="flex items-center gap-2 border-b border-stone-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {(
          [
            { id: 'summary', label: '1. Summary & Key Facts' },
            {
              id: 'risks',
              label: `2. Risk Flags & Questions (${currentTranslation.riskFlags.length})`,
            },
            {
              id: 'clauses',
              label: `3. Side-by-Side Clauses & Glossary (${currentTranslation.clauses.length})`,
            },
            { id: 'ask', label: '4. Ask the Document (Q&A)' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === tab.id
                ? 'bg-[#0F766E] text-white'
                : 'text-stone-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: IN SHORT SUMMARY, OBLIGATIONS & KEY FACTS (FR-L2 Order) */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* 1. In Short (<= 100 words) */}
          <div className="bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                In Short ({readingLevel} Reading Level · ≤ 100 Words)
              </span>
              <span className="font-mono text-xs text-stone-500">
                {activeDoc.agreementType} · {activeDoc.pages} Pages
              </span>
            </div>
            <p
              data-testid="legal-in-short-summary"
              className="text-base sm:text-lg font-medium text-stone-900 dark:text-white leading-relaxed"
            >
              {currentTranslation.inShortSummary[readingLevel]}
            </p>
          </div>

          {/* 2. What You Are Agreeing To (Obligations of Each Party) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                What You Are Agreeing To (Tenant / Signer Obligations)
              </h3>
              <ul className="space-y-2.5 text-xs text-stone-700 dark:text-slate-300">
                {currentTranslation.partyAObligations.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="font-mono font-bold text-[#0F766E] shrink-0">
                      0{i + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                Counterparty Obligations (Landlord / Company)
              </h3>
              <ul className="space-y-2.5 text-xs text-stone-700 dark:text-slate-300">
                {currentTranslation.partyBObligations.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="font-mono font-bold text-stone-500 shrink-0">
                      0{i + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Key Facts Grid */}
          <div className="bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-white">
              Key Facts Extracted from Agreement
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {currentTranslation.keyFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="p-3.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50/60 dark:bg-slate-900/50 space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-slate-400">
                    <span>{fact.label}</span>
                    <span className="font-mono">{fact.clauseRef}</span>
                  </div>
                  <div className="text-xs font-bold text-stone-900 dark:text-white">
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RISK FLAGS & QUESTIONS TO ASK BEFORE SIGNING */}
      {(activeTab === 'risks' || activeTab === 'summary') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Risk Flags (Red, Amber, Green) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white">
                  Clause Risk Flags (Red · Amber · Green)
                </h3>
                <p className="text-xs text-stone-500 dark:text-slate-400">
                  Every flag is anchored to a specific clause number in the document
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {currentTranslation.riskFlags.map((flag) => {
                const icon =
                  flag.level === 'Red' ? (
                    <AlertOctagon className="w-4 h-4 text-[#DC2626] shrink-0" />
                  ) : flag.level === 'Amber' ? (
                    <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  );

                const labelColor =
                  flag.level === 'Red'
                    ? 'text-[#DC2626]'
                    : flag.level === 'Amber'
                    ? 'text-[#D97706]'
                    : 'text-[#16A34A]';

                return (
                  <div
                    key={flag.id}
                    className="p-4 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50/40 dark:bg-slate-900/40 space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        {icon}
                        <span className={`font-bold ${labelColor}`}>
                          [{flag.level} Risk]
                        </span>
                        <span className="font-bold text-stone-900 dark:text-white">
                          {flag.title}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('clauses')}
                        className="font-mono text-[11px] text-[#0F766E] hover:underline shrink-0 cursor-pointer"
                      >
                        {flag.clauseNumber} →
                      </button>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-slate-300 leading-relaxed pl-6">
                      {flag.oneLineReason}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Questions to Ask Before Signing + Glossary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-base font-bold text-stone-900 dark:text-white">
                Questions to Ask Before Signing
              </h3>
              <p className="text-xs text-stone-500 dark:text-slate-400">
                Practical negotiation points you can raise with the landlord, employer, or lawyer
              </p>
              <ul className="space-y-2.5 text-xs text-stone-700 dark:text-slate-300 pt-1">
                {currentTranslation.questionsToAsk.map((q, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-900/50 flex items-start gap-2.5 leading-relaxed"
                  >
                    <HelpCircle className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Glossary with bracketed English terms (FR-M3) */}
            <div className="bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#0F766E]" />
                <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                  Legal Jargon Glossary (Tap to Highlight)
                </h3>
              </div>
              <div className="space-y-2 text-xs">
                {currentTranslation.glossary.map((g) => {
                  const isExpanded = selectedGlossaryTerm === g.term;
                  return (
                    <div
                      key={g.term}
                      onClick={() =>
                        setSelectedGlossaryTerm(isExpanded ? null : g.term)
                      }
                      className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                        isExpanded
                          ? 'border-[#0F766E] bg-[#0F766E]/5'
                          : 'border-stone-200 dark:border-slate-800 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 dark:text-white">
                          {g.originalTermBracketed}
                        </span>
                        <span className="font-mono text-[11px] text-stone-500">
                          {g.clauseRef}
                        </span>
                      </div>
                      <p className="text-stone-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {g.definition}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SIDE-BY-SIDE ORIGINAL CLAUSE VS PLAIN LANGUAGE (FR-L4) */}
      {activeTab === 'clauses' && (
        <div className="bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">
                Side-by-Side Clause Comparison ({readingLevel} Mode)
              </h3>
              <p className="text-xs text-stone-500 dark:text-slate-400">
                Original English contract clause on the left, plain-language explanation in your chosen language on the right (FR-L4)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {currentTranslation.clauses.map((clause) => {
              const riskTextClass =
                clause.riskLevel === 'Red'
                  ? 'text-[#DC2626]'
                  : clause.riskLevel === 'Amber'
                  ? 'text-[#D97706]'
                  : 'text-[#16A34A]';

              return (
                <div
                  key={clause.id}
                  className="rounded-xl border border-stone-200 dark:border-slate-800 overflow-hidden"
                >
                  <div className="px-4 py-2.5 bg-stone-50 dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900 dark:text-white">
                        {clause.clauseNumber}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-stone-800 dark:text-slate-200">
                        {clause.title}
                      </span>
                    </div>
                    <span className={`font-semibold ${riskTextClass}`}>
                      {clause.riskLevel} Risk: {clause.riskReason}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200 dark:divide-slate-800">
                    {/* Original Legal Text */}
                    <div className="p-4 space-y-1.5 bg-white dark:bg-[#111722]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                        ORIGINAL CONTRACT CLAUSE
                      </span>
                      <p className="text-xs font-mono text-stone-700 dark:text-slate-300 leading-relaxed">
                        {clause.originalText}
                      </p>
                    </div>

                    {/* Simplified Plain-Language Explanation */}
                    <div className="p-4 space-y-1.5 bg-stone-50/40 dark:bg-slate-900/40">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#0F766E] block">
                        PLAIN-LANGUAGE EXPLANATION ({readingLevel.toUpperCase()})
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-stone-900 dark:text-white leading-relaxed">
                        {clause.simplifiedText[readingLevel]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: ASK THE DOCUMENT GROUNDED CHAT WITH CLAUSE CITATIONS (FR-L5) */}
      {activeTab === 'ask' && (
        <div className="bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#0F766E]" />
                Ask the Document (Clause-Grounded Q&A)
              </h3>
              <p className="text-xs text-stone-500 dark:text-slate-400">
                Answers strictly from the uploaded document and cites the exact clause number. Refuses when an answer is not in the text (FR-L5).
              </p>
            </div>
          </div>

          {/* Preset Quick Questions */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-500">Try asking:</span>
            {[
              'Can the landlord increase rent anytime?',
              'What happens if I vacate before 9 months?',
              'Does the agreement allow keeping pets?',
            ].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleAskQuestion(q)}
                className="px-3 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-300 cursor-pointer"
              >
                “{q}”
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="space-y-3 max-h-[360px] overflow-y-auto p-3 rounded-xl bg-stone-50 dark:bg-slate-900/70 border border-stone-200 dark:border-slate-800">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3.5 rounded-xl text-xs max-w-2xl ${
                  msg.role === 'user'
                    ? 'ml-auto bg-[#0F766E] text-white'
                    : 'bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-slate-100'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                {msg.citedClauses.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-stone-200/60 dark:border-slate-700 flex items-center gap-2 text-[11px] font-mono text-[#0F766E] dark:text-teal-400">
                    <span>Cited Clauses:</span>
                    <span>{msg.citedClauses.join(' · ')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chat Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskQuestion();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleVoiceQuestionInput}
              aria-label="Voice input question"
              className="p-2.5 rounded-lg border border-stone-300 dark:border-slate-700 text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800"
            >
              <Mic className="w-4 h-4 text-[#0F766E]" />
            </button>
            <input
              type="text"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder="Ask a question about rent, deposit, lock-in, notice period, or penalties..."
              className="flex-1 px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={isAsking}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#0F766E] text-white hover:bg-[#0D655E] disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              {isAsking ? 'Checking...' : 'Ask'}
            </button>
          </form>
        </div>
      )}

      {/* Standing Guardrail Disclaimer (FR-L7 & Section 20) */}
      <div className="p-4 rounded-xl bg-stone-100/80 dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 text-xs text-stone-600 dark:text-slate-400 leading-relaxed">
        <strong className="text-stone-900 dark:text-slate-200">
          Standing Legal Disclaimer (FR-L7):{' '}
        </strong>
        {disclaimerText}
      </div>
    </div>
  );
};
