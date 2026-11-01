import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Flame,
  Lock,
  Maximize2,
  Minimize2,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { BoundingBox, VerificationReport } from '../types/docutrust';

interface DocumentCanvasViewerProps {
  report: VerificationReport;
  showHeatmap: boolean;
  onToggleHeatmap: () => void;
  selectedPin: number | null;
  onSelectPin: (pin: number | null) => void;
  isScanning?: boolean;
  redactedMode?: boolean;
  onToggleRedacted?: () => void;
}

export const DocumentCanvasViewer: React.FC<DocumentCanvasViewerProps> = ({
  report,
  showHeatmap,
  onToggleHeatmap,
  selectedPin,
  onSelectPin,
  isScanning = false,
  redactedMode = true,
  onToggleRedacted,
}) => {
  const [zoomed, setZoomed] = useState(false);

  const bboxes: BoundingBox[] = report.findings
    .filter((f) => f.bbox)
    .map((f) => f.bbox!);

  const maskIfRedacted = (text: string, fallbackMasked: string) => {
    return redactedMode ? fallbackMasked : text;
  };

  return (
    <div className="flex flex-col bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl overflow-hidden">
      {/* Viewer Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-stone-200 dark:border-slate-800 bg-stone-50/70 dark:bg-slate-900/60">
        <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-slate-400">
          <span className="font-medium text-stone-900 dark:text-slate-100 truncate max-w-[220px]">
            {report.documentName}
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">{report.fileSize}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">
            {report.pages} {report.pages === 1 ? ' page' : ' pages'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleHeatmap}
            aria-pressed={showHeatmap}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              showHeatmap
                ? 'bg-[#0F766E] text-white border-[#0F766E]'
                : 'bg-white dark:bg-slate-800 text-stone-700 dark:text-slate-200 border-stone-300 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            {showHeatmap ? 'Heatmap & Pins: ON' : 'Show Heatmap & Pins'}
          </button>

          {onToggleRedacted && (
            <button
              type="button"
              onClick={onToggleRedacted}
              aria-pressed={redactedMode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
            >
              {redactedMode ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-[#0F766E]" />
                  PII Masked
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                  PII Unmasked
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            aria-label={zoomed ? 'Reset document zoom' : 'Zoom document preview'}
            className="p-1.5 rounded-lg border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors"
          >
            {zoomed ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Document Viewport */}
      <div className="relative p-5 sm:p-6 bg-stone-100/80 dark:bg-[#0B0F14] flex items-center justify-center min-h-[420px] overflow-auto">
        <div
          data-testid="document-forensic-surface"
          className={`relative w-full max-w-[640px] bg-white dark:bg-slate-900 text-stone-900 dark:text-slate-100 border border-stone-300 dark:border-slate-700 rounded-xl p-5 sm:p-6 shadow-xs transition-transform duration-200 ${
            zoomed ? 'scale-[1.06]' : 'scale-100'
          }`}
        >
          {/* Active Scanning Line (Motion Spec 7.3) */}
          {isScanning && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#0F766E] to-transparent shadow-[0_0_16px_#0F766E] z-30 animate-scan-line"
            />
          )}

          {/* ELA Heatmap SVG Filter Layer */}
          {showHeatmap && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-xl z-10 transition-opacity duration-300 bg-[#0F766E]/[0.03] dark:bg-[#0F766E]/[0.06]"
            />
          )}

          {/* Custom Uploaded Image Preview */}
          {report.templateRenderData.customImageDataUrl ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-slate-800 pb-2">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-[#0F766E]">
                    {report.templateRenderData.issuerTitle}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-slate-400">
                    {report.templateRenderData.subtitle}
                  </p>
                </div>
                <span className="font-mono text-xs text-stone-500">
                  SHA-256: {report.sha256Hash.slice(0, 10)}...
                </span>
              </div>
              <img
                src={report.templateRenderData.customImageDataUrl}
                alt={`Uploaded document ${report.documentName}`}
                referrerPolicy="no-referrer"
                className="w-full max-h-[340px] object-contain rounded-lg border border-stone-200 dark:border-slate-800"
              />
            </div>
          ) : (
            /* High-Fidelity Structured Document Simulation */
            <div className="space-y-4 text-xs">
              {/* Document Header */}
              <div className="flex items-start justify-between gap-4 border-b border-stone-200 dark:border-slate-800 pb-3">
                <div>
                  <p className="text-[11px] font-semibold tracking-wider text-[#0F766E] uppercase">
                    {report.templateRenderData.issuerTitle}
                  </p>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-white mt-0.5">
                    {report.templateRenderData.subtitle}
                  </h4>
                </div>
                <div className="text-right font-mono text-[11px] text-stone-500 dark:text-slate-400 shrink-0">
                  <div>DATE: {report.templateRenderData.issueDate}</div>
                  <div>ID: {report.reportId}</div>
                </div>
              </div>

              {/* Holder Metadata Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-stone-50 dark:bg-slate-800/60 border border-stone-200/80 dark:border-slate-800">
                <div>
                  <span className="block text-[10px] text-stone-500 dark:text-slate-400">
                    NAME / HOLDER
                  </span>
                  <span className="font-semibold text-stone-900 dark:text-white">
                    {report.templateRenderData.holderName}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-500 dark:text-slate-400">
                    IDENTIFIER
                  </span>
                  <span className="font-mono font-semibold text-stone-900 dark:text-white">
                    {maskIfRedacted(
                      report.extractedFields[1]?.valueRaw || report.templateRenderData.idNumber,
                      report.templateRenderData.idNumber
                    )}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="block text-[10px] text-stone-500 dark:text-slate-400">
                    STATUS / SUMMARY
                  </span>
                  <span className="font-medium text-stone-700 dark:text-slate-300">
                    {report.templateRenderData.secondaryInfo}
                  </span>
                </div>
              </div>

              {/* Document Body per Type */}
              {report.documentType === 'marks_card' && report.marksRows && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse font-mono text-[11px]">
                    <thead>
                      <tr className="border-b border-stone-300 dark:border-slate-700 text-stone-500 dark:text-slate-400">
                        <th className="py-1.5 pr-2">CODE</th>
                        <th className="py-1.5 px-2 font-sans">SUBJECT</th>
                        <th className="py-1.5 px-2 text-right">INT</th>
                        <th className="py-1.5 px-2 text-right">EXT</th>
                        <th className="py-1.5 pl-2 text-right">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 dark:divide-slate-800">
                      {report.marksRows.map((row) => {
                        const isDiscrepant =
                          row.internalMarks + row.externalMarks !== row.totalMarks;
                        return (
                          <tr
                            key={row.subjectCode}
                            className={
                              isDiscrepant
                                ? 'bg-red-50/70 dark:bg-red-950/30 font-semibold text-red-900 dark:text-red-200'
                                : ''
                            }
                          >
                            <td className="py-1.5 pr-2">{row.subjectCode}</td>
                            <td className="py-1.5 px-2 font-sans">{row.subjectName}</td>
                            <td className="py-1.5 px-2 text-right">{row.internalMarks}</td>
                            <td className="py-1.5 px-2 text-right">{row.externalMarks}</td>
                            <td className="py-1.5 pl-2 text-right">
                              {row.totalMarks} / {row.maxMarks}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="mt-3 flex items-center justify-between p-2.5 rounded-lg bg-stone-100 dark:bg-slate-800 font-mono text-xs">
                    <span>DECLARED GRAND TOTAL:</span>
                    <span className="font-bold">
                      {report.extractedFields.find((f) => f.name.includes('Grand Total'))
                        ?.valueRaw || '472 / 600'}
                    </span>
                  </div>
                </div>
              )}

              {report.documentType === 'bank_statement' && report.bankRows && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse font-mono text-[11px]">
                    <thead>
                      <tr className="border-b border-stone-300 dark:border-slate-700 text-stone-500 dark:text-slate-400">
                        <th className="py-1.5 pr-2">DATE</th>
                        <th className="py-1.5 px-2 font-sans">NARRATION</th>
                        <th className="py-1.5 px-2">UTR / REF</th>
                        <th className="py-1.5 px-2 text-right">DEBIT</th>
                        <th className="py-1.5 px-2 text-right">CREDIT</th>
                        <th className="py-1.5 pl-2 text-right">BALANCE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 dark:divide-slate-800">
                      {report.bankRows.map((row) => {
                        const isFlagged = row.rowNumber === 3 || row.rowNumber === 5;
                        return (
                          <tr
                            key={row.rowNumber}
                            className={
                              isFlagged
                                ? 'bg-red-50/70 dark:bg-red-950/30 text-red-900 dark:text-red-200 font-semibold'
                                : ''
                            }
                          >
                            <td className="py-1.5 pr-2 whitespace-nowrap">{row.date}</td>
                            <td className="py-1.5 px-2 font-sans truncate max-w-[140px]">
                              {row.description}
                            </td>
                            <td className="py-1.5 px-2">{row.reference}</td>
                            <td className="py-1.5 px-2 text-right">
                              {row.debit > 0 ? row.debit.toLocaleString('en-IN') : '—'}
                            </td>
                            <td className="py-1.5 px-2 text-right">
                              {row.credit > 0 ? row.credit.toLocaleString('en-IN') : '—'}
                            </td>
                            <td className="py-1.5 pl-2 text-right">
                              ₹{row.balance.toLocaleString('en-IN')}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {(report.documentType === 'aadhaar' ||
                report.documentType === 'pan' ||
                report.documentType === 'certificate' ||
                report.documentType === 'other') && (
                <div className="grid grid-cols-12 gap-4 items-center py-3">
                  {/* Simulated Portrait Slot */}
                  <div className="col-span-3 flex flex-col items-center justify-center p-3 rounded-lg border border-stone-300 dark:border-slate-700 bg-stone-100 dark:bg-slate-800 min-h-[110px]">
                    <div className="w-12 h-12 rounded-full bg-stone-300 dark:bg-slate-700 flex items-center justify-center text-stone-600 dark:text-slate-300 font-bold text-sm">
                      {report.templateRenderData.holderName.trim().slice(0, 2)}
                    </div>
                    <span className="text-[10px] text-stone-500 mt-2 font-mono">PHOTO REGION</span>
                  </div>

                  {/* Field Details */}
                  <div className="col-span-6 space-y-2">
                    {report.extractedFields.map((field) => (
                      <div
                        key={field.id}
                        className="flex items-center justify-between border-b border-stone-100 dark:border-slate-800 pb-1"
                      >
                        <span className="text-[11px] text-stone-500 dark:text-slate-400">
                          {field.name}:
                        </span>
                        <span className="font-mono font-semibold text-stone-900 dark:text-slate-100">
                          {redactedMode && field.sensitive ? field.valueMasked : field.valueRaw}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* QR / Seal Region */}
                  <div className="col-span-3 flex flex-col items-center justify-center p-3 rounded-lg border border-stone-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-800/70 min-h-[110px]">
                    <QrCode className="w-12 h-12 text-stone-700 dark:text-slate-300" />
                    <span className="text-[10px] font-mono text-stone-500 mt-1 text-center">
                      {report.templateRenderData.qrStatus === 'verified'
                        ? 'SIGNED QR OK'
                        : report.templateRenderData.qrStatus === 'mismatch'
                        ? 'QR MISMATCH'
                        : 'SEAL / QR'}
                    </span>
                  </div>
                </div>
              )}

              {/* Document Footer Seal & Signature Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-200 dark:border-slate-800 text-[11px] text-stone-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span className="font-mono">
                    SHA-256: {report.sha256Hash.slice(0, 16)}...
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  {report.templateRenderData.sealStatus === 'resampled' ? (
                    <span className="text-amber-700 dark:text-amber-400 flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      SEAL: 96 DPI RESAMPLED
                    </span>
                  ) : (
                    <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      SIGNATURE BLOCK
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Heatmap & Numbered Forensic Pins Overlay (FR-R2 & Motion Spec 7.3) */}
          {showHeatmap &&
            bboxes.map((box) => {
              const isSelected = selectedPin === box.pinNumber;
              const borderColor =
                box.severity === 'Critical'
                  ? 'border-[#DC2626] bg-[#DC2626]/20'
                  : box.severity === 'Warning'
                  ? 'border-[#D97706] bg-[#D97706]/20'
                  : 'border-[#0F766E] bg-[#0F766E]/15';

              const pinBg =
                box.severity === 'Critical'
                  ? 'bg-[#DC2626] text-white'
                  : box.severity === 'Warning'
                  ? 'bg-[#D97706] text-white'
                  : 'bg-[#0F766E] text-white';

              return (
                <div
                  key={box.id}
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.width}%`,
                    height: `${box.height}%`,
                  }}
                  className={`absolute z-20 rounded-lg border-2 transition-all duration-200 ${borderColor} ${
                    isSelected ? 'ring-4 ring-[#0F766E]/40 scale-[1.02]' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      onSelectPin(selectedPin === box.pinNumber ? null : box.pinNumber)
                    }
                    aria-label={`Forensic Pin ${box.pinNumber}: ${box.label} (${box.severity})`}
                    className={`-top-3 -left-3 absolute w-6 h-6 rounded-full font-mono text-xs font-bold flex items-center justify-center shadow-sm cursor-pointer transition-transform hover:scale-110 ${pinBg}`}
                  >
                    {box.pinNumber}
                  </button>

                  {isSelected && (
                    <div className="absolute left-0 -bottom-9 z-30 bg-stone-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-md whitespace-nowrap">
                      Pin #{box.pinNumber}: {box.label}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Bottom Legend Bar */}
      <div className="px-4 py-2.5 bg-stone-50 dark:bg-slate-900/90 border-t border-stone-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600 dark:text-slate-400">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]" />
            Critical Anomaly
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#D97706]" />
            Warning Region
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#0F766E]" />
            Verified Rule Check
          </span>
        </div>
        <span className="text-[11px] text-stone-500 dark:text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#0F766E]" />
          Click any numbered pin (1–{bboxes.length || 1}) to inspect forensic evidence
        </span>
      </div>
    </div>
  );
};
