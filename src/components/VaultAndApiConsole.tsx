import React, { useState } from 'react';
import {
  CheckCircle2,
  Code2,
  Download,
  FolderKanban,
  Play,
  Search,
  Shield,
  Trash2,
} from 'lucide-react';
import {
  RetentionPolicy,
  VerdictBand,
  VerificationReport,
} from '../types/docutrust';

interface VaultAndApiConsoleProps {
  reports: VerificationReport[];
  onSelectReportAndNavigate: (report: VerificationReport) => void;
  onDeleteReport: (id: string) => void;
  onDeleteAllHistory: () => void;
  retention: RetentionPolicy;
  onChangeRetention: (policy: RetentionPolicy) => void;
}

export const VaultAndApiConsole: React.FC<VaultAndApiConsoleProps> = ({
  reports,
  onSelectReportAndNavigate,
  onDeleteReport,
  onDeleteAllHistory,
  retention,
  onChangeRetention,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [verdictFilter, setVerdictFilter] = useState<'ALL' | VerdictBand>('ALL');
  const [apiResponseText, setApiResponseText] = useState<string>('');
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<
    'GET /v1/verifications' | 'POST /v1/verifications' | 'POST /v1/legal/summaries'
  >('GET /v1/verifications');

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reportId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.templateRenderData.holderName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVerdict =
      verdictFilter === 'ALL' ? true : r.verdict === verdictFilter;
    return matchesSearch && matchesVerdict;
  });

  const handleExportVaultJson = () => {
    const payload = JSON.stringify(reports, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `docutrust-vault-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRunLiveEndpoint = async () => {
    setIsTestingApi(true);
    try {
      if (selectedEndpoint === 'GET /v1/verifications') {
        const res = await fetch('/v1/verifications');
        const json = await res.json();
        setApiResponseText(JSON.stringify(json, null, 2));
      } else if (selectedEndpoint === 'POST /v1/verifications') {
        const res = await fetch('/v1/verifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: 'API_Batch_Check_PAN_Card.pdf',
            fileSize: '420 KB',
            documentType: 'pan',
          }),
        });
        const json = await res.json();
        setApiResponseText(JSON.stringify(json, null, 2));
      } else {
        const res = await fetch('/v1/legal/summaries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'API Vendor NDA Agreement',
            text: 'The Receiving Party shall indemnify the Disclosing Party without cap and may not terminate for 36 months.',
            language: 'en',
            readingLevel: 'Simple',
          }),
        });
        const json = await res.json();
        setApiResponseText(JSON.stringify(json, null, 2));
      }
    } catch (err) {
      setApiResponseText(
        JSON.stringify({ error: 'Failed to reach /v1 endpoint', details: String(err) }, null, 2)
      );
    } finally {
      setIsTestingApi(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: HISTORY VAULT & PRIVACY RETENTION CONTROLS (FR-V1 to FR-V3) */}
      <div className="bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold text-[#0F766E]">
              History Vault & Retention Governance (FR-V1 – FR-V3)
            </span>
            <h1 className="text-xl font-bold text-stone-900 dark:text-white mt-0.5">
              Verification History & Data Lifecycle Controls
            </h1>
            <p className="text-xs text-stone-600 dark:text-slate-400">
              Filter past checks by risk verdict, adjust automated file deletion rules, export your audit log, or purge all records in one tap.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportVaultJson}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-stone-300 dark:border-slate-700 text-stone-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800 cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              Export JSON Audit Log
            </button>

            <button
              type="button"
              onClick={onDeleteAllHistory}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#DC2626] text-white hover:bg-red-700 cursor-pointer whitespace-nowrap"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Everything
            </button>
          </div>
        </div>

        {/* Retention Policy Selector (FR-V2) */}
        <div className="p-4 rounded-xl bg-stone-50 dark:bg-slate-900/70 border border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-2.5 text-xs">
            <Shield className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-900 dark:text-white block">
                Automated File Retention Policy (FR-V2)
              </span>
              <span className="text-stone-600 dark:text-slate-400">
                Controls how long uploaded files and derived forensic reports remain in encrypted storage.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-800 rounded-lg border border-stone-200 dark:border-slate-700 shrink-0">
            {(
              [
                { id: 'delete_after_check', label: 'Delete After Check (Default)' },
                { id: '24_hours', label: '24 Hours' },
                { id: '30_days', label: '30 Days' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChangeRetention(opt.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  retention === opt.id
                    ? 'bg-[#0F766E] text-white'
                    : 'text-stone-600 dark:text-slate-300 hover:text-stone-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Verdict Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by file name, holder name, or report ID..."
              aria-label="Search verification history"
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                'ALL',
                'Likely tampered',
                'Needs review',
                'Looks authentic',
                'Inconclusive',
              ] as const
            ).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVerdictFilter(v)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer ${
                  verdictFilter === v
                    ? 'border-[#0F766E] bg-[#0F766E]/10 text-[#0F766E] dark:text-teal-300 font-semibold'
                    : 'border-stone-200 dark:border-slate-800 text-stone-600 dark:text-slate-400'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Organization Batch / History Risk Table (FR-O4) */}
        {filteredReports.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-stone-200 dark:border-slate-800 space-y-2">
            <FolderKanban className="w-6 h-6 text-stone-400 mx-auto" />
            <p className="text-sm font-semibold text-stone-900 dark:text-white">
              No verification records match your filter
            </p>
            <p className="text-xs text-stone-500">
              Upload a document in the Verify tab or reset your search criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-stone-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 text-stone-500">
                  <th className="py-2.5 px-4">Report ID</th>
                  <th className="py-2.5 px-4">Document File</th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4 text-right">Trust Score</th>
                  <th className="py-2.5 px-4">Verdict</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-slate-800">
                {filteredReports.map((item) => {
                  const verdictClass =
                    item.verdict === 'Looks authentic'
                      ? 'text-[#16A34A]'
                      : item.verdict === 'Needs review'
                      ? 'text-[#D97706]'
                      : item.verdict === 'Likely tampered'
                      ? 'text-[#DC2626]'
                      : 'text-stone-500';

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-stone-50/80 dark:hover:bg-slate-800/40"
                    >
                      <td className="py-3 px-4 font-mono font-medium text-stone-900 dark:text-white">
                        {item.reportId}
                      </td>
                      <td className="py-3 px-4 font-medium text-stone-900 dark:text-white">
                        {item.documentName}
                      </td>
                      <td className="py-3 px-4 text-stone-600 dark:text-slate-400">
                        {item.documentType}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-stone-900 dark:text-white">
                        {item.score} / 100
                      </td>
                      <td className={`py-3 px-4 font-semibold ${verdictClass}`}>
                        {item.verdict}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onSelectReportAndNavigate(item)}
                          className="text-[#0F766E] font-semibold hover:underline cursor-pointer"
                        >
                          Open Report
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteReport(item.id)}
                          aria-label={`Delete report ${item.reportId}`}
                          className="text-stone-400 hover:text-[#DC2626] cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECTION 2: INSTITUTIONAL REST API CONSOLE (/v1/* Spec in Section 10) */}
      <div className="bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold text-[#0F766E]">
              Institutional REST API (/v1/* Specification · Goal G4 & Section 10)
            </span>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white mt-0.5 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#0F766E]" />
              Live /v1/* Endpoint Sandbox & Webhook Reference
            </h2>
            <p className="text-xs text-stone-600 dark:text-slate-400">
              Colleges, banks, NBFCs, and HR platforms can integrate DocuTrust AI directly via JSON REST endpoints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              aria-label="Select API endpoint to test"
              value={selectedEndpoint}
              onChange={(e) =>
                setSelectedEndpoint(
                  e.target.value as
                    | 'GET /v1/verifications'
                    | 'POST /v1/verifications'
                    | 'POST /v1/legal/summaries'
                )
              }
              className="px-3 py-2 text-xs font-mono rounded-lg border border-stone-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white"
            >
              <option value="GET /v1/verifications">GET /v1/verifications</option>
              <option value="POST /v1/verifications">POST /v1/verifications</option>
              <option value="POST /v1/legal/summaries">POST /v1/legal/summaries</option>
            </select>

            <button
              type="button"
              onClick={handleRunLiveEndpoint}
              disabled={isTestingApi}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#0F766E] text-white hover:bg-[#0D655E] cursor-pointer whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5" />
              {isTestingApi ? 'Calling...' : 'Send Live Request'}
            </button>
          </div>
        </div>

        {/* Endpoint Table from PRD Section 10 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6 overflow-x-auto border border-stone-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 text-stone-500">
                  <th className="py-2 px-3">Endpoint</th>
                  <th className="py-2 px-3">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-slate-800 font-mono text-[11px]">
                <tr>
                  <td className="py-2 px-3 text-[#0F766E]">POST /v1/documents</td>
                  <td className="py-2 px-3 font-sans text-stone-600 dark:text-slate-400">
                    Upload file & compute SHA-256 hash
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-[#0F766E]">POST /v1/verifications</td>
                  <td className="py-2 px-3 font-sans text-stone-600 dark:text-slate-400">
                    Start multi-module tamper analysis
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-[#0F766E]">GET /v1/verifications/:id</td>
                  <td className="py-2 px-3 font-sans text-stone-600 dark:text-slate-400">
                    Score, verdict, findings & heatmap coordinates
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-[#0F766E]">POST /v1/legal/summaries</td>
                  <td className="py-2 px-3 font-sans text-stone-600 dark:text-slate-400">
                    Generate plain-language summary & risk flags
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-[#0F766E]">POST /v1/legal/summaries/:id/ask</td>
                  <td className="py-2 px-3 font-sans text-stone-600 dark:text-slate-400">
                    Grounded Q&A with exact clause citations
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-[#0F766E]">DELETE /v1/documents/:id</td>
                  <td className="py-2 px-3 font-sans text-stone-600 dark:text-slate-400">
                    Purge file and derived records immediately
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-6">
            <div className="p-3.5 rounded-xl bg-stone-900 text-stone-100 font-mono text-[11px] h-full min-h-[200px] max-h-[260px] overflow-auto">
              <div className="text-stone-400 mb-2 flex items-center justify-between">
                <span>LIVE SERVER RESPONSE ({selectedEndpoint})</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 200 OK
                </span>
              </div>
              <pre className="whitespace-pre-wrap break-all">
                {apiResponseText ||
                  '// Click "Send Live Request" above to inspect the live JSON payload from /v1/*'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
