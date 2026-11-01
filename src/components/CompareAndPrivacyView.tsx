import React, { useState } from 'react';
import {
  AlertOctagon,
  ArrowLeftRight,
  CheckCircle2,
  Copy,
  Check,
  Shield,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { COMPARE_PRESETS } from '../data/verificationSamples';
import {
  computeExtractedFieldDiffs,
  redactSensitiveText,
} from '../utils/forensicsEngine';

export const CompareAndPrivacyView: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState(COMPARE_PRESETS[0].id);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [viewMode, setViewMode] = useState<'side_by_side' | 'slider'>('side_by_side');

  // Privacy & Redaction Studio state (FR-D1 & FR-D2)
  const [rawRedactionInput, setRawRedactionInput] = useState(
    'Applicant Rakesh Sharma submitted Aadhaar 4829 1037 5625, PAN Card ABCPS4821K, and mobile +91 9845012345 for home loan verification.'
  );
  const [copiedRedacted, setCopiedRedacted] = useState(false);

  const activePreset =
    COMPARE_PRESETS.find((p) => p.id === selectedPresetId) || COMPARE_PRESETS[0];

  const fieldDiffs = computeExtractedFieldDiffs(
    activePreset.originalDoc.extractedFields,
    activePreset.suspectDoc.extractedFields
  );

  const redactionOutput = redactSensitiveText(rawRedactionInput);

  const handleCopyRedacted = () => {
    navigator.clipboard?.writeText(redactionOutput.redactedText);
    setCopiedRedacted(true);
    setTimeout(() => setCopiedRedacted(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: COMPARE MODE (FR-X1 & FR-X2) */}
      <div className="bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold text-[#0F766E]">
              Compare Mode (FR-X1 & FR-X2)
            </span>
            <h1 className="text-xl font-bold text-stone-900 dark:text-white mt-0.5">
              Original vs Suspect Document Diff Engine
            </h1>
            <p className="text-xs text-stone-600 dark:text-slate-400 mt-0.5">
              Auto-aligns an authentic reference against a suspect submission to highlight modified pixel regions and arithmetic field diffs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {COMPARE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSelectedPresetId(preset.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  preset.id === activePreset.id
                    ? 'border-[#0F766E] bg-[#0F766E] text-white'
                    : 'border-stone-300 dark:border-slate-700 text-stone-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800'
                }`}
              >
                {preset.documentType === 'marks_card'
                  ? 'Marks Card (412 vs 472)'
                  : 'Bank Statement (₹85k vs ₹1.85L)'}
              </button>
            ))}

            <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-slate-800 rounded-lg">
              <button
                type="button"
                onClick={() => setViewMode('side_by_side')}
                className={`px-3 py-1 text-xs font-medium rounded-md cursor-pointer ${
                  viewMode === 'side_by_side'
                    ? 'bg-white dark:bg-slate-900 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-slate-400'
                }`}
              >
                Side-by-Side
              </button>
              <button
                type="button"
                onClick={() => setViewMode('slider')}
                className={`px-3 py-1 text-xs font-medium rounded-md cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-white dark:bg-slate-900 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-slate-400'
                }`}
              >
                Overlay Slider
              </button>
            </div>
          </div>
        </div>

        {/* Visual Comparison Surface */}
        {viewMode === 'side_by_side' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Original Card */}
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/70 bg-emerald-50/20 dark:bg-emerald-950/15 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#16A34A] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  ORIGINAL REFERENCE ({activePreset.originalDoc.score}/100)
                </span>
                <span className="font-mono text-stone-500">
                  {activePreset.originalDoc.documentName}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-stone-900 dark:text-white">
                  {activePreset.originalDoc.templateRenderData.issuerTitle}
                </div>
                <div className="text-stone-600 dark:text-slate-400">
                  {activePreset.originalDoc.templateRenderData.secondaryInfo}
                </div>
                <div className="pt-2 border-t border-stone-100 dark:border-slate-800 space-y-1.5">
                  {activePreset.originalDoc.extractedFields.map((f) => (
                    <div key={f.id} className="flex justify-between font-mono">
                      <span className="font-sans text-stone-500">{f.name}:</span>
                      <span className="font-semibold text-stone-900 dark:text-white">
                        {f.valueRaw}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Suspect Card */}
            <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/70 bg-red-50/20 dark:bg-red-950/15 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#DC2626] flex items-center gap-1.5">
                  <AlertOctagon className="w-4 h-4" />
                  SUSPECT COPY ({activePreset.suspectDoc.score}/100 — {activePreset.suspectDoc.verdict})
                </span>
                <span className="font-mono text-stone-500">
                  {activePreset.suspectDoc.documentName}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-stone-900 dark:text-white">
                  {activePreset.suspectDoc.templateRenderData.issuerTitle}
                </div>
                <div className="text-[#DC2626] font-medium">
                  {activePreset.suspectDoc.templateRenderData.secondaryInfo}
                </div>
                <div className="pt-2 border-t border-stone-100 dark:border-slate-800 space-y-1.5">
                  {activePreset.suspectDoc.extractedFields.map((f, idx) => {
                    const origVal = activePreset.originalDoc.extractedFields[idx]?.valueRaw;
                    const isChanged = origVal !== f.valueRaw;
                    return (
                      <div
                        key={f.id}
                        className={`flex justify-between font-mono px-1.5 py-0.5 rounded ${
                          isChanged
                            ? 'bg-red-100 dark:bg-red-950/60 text-[#DC2626] font-bold'
                            : ''
                        }`}
                      >
                        <span className="font-sans">{f.name}:</span>
                        <span>{f.valueRaw}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Interactive Slider Overlay View */
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-stone-700 dark:text-slate-300 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#0F766E]" />
                Drag slider to wipe between Original ({sliderPosition}%) and Suspect ({100 - sliderPosition}%)
              </span>
              <input
                type="range"
                aria-label="Comparison overlay split percentage"
                min={5}
                max={95}
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="w-48 accent-[#0F766E]"
              />
            </div>

            <div className="relative h-56 rounded-xl border border-stone-300 dark:border-slate-700 overflow-hidden bg-stone-50 dark:bg-slate-900 p-5">
              {/* Suspect Background */}
              <div className="absolute inset-0 p-5 bg-red-50/40 dark:bg-red-950/30 flex flex-col justify-between">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-[#DC2626]">SUSPECT DOCUMENT LAYER</span>
                  <span className="font-mono text-[#DC2626]">
                    {activePreset.suspectDoc.templateRenderData.secondaryInfo}
                  </span>
                </div>
                <div className="space-y-2">
                  {activePreset.pixelDiffRegions.map((reg) => (
                    <div
                      key={reg.id}
                      className="p-2.5 rounded-lg border border-red-300 dark:border-red-800 bg-white/90 dark:bg-slate-900/90 text-xs font-mono text-[#DC2626]"
                    >
                      [DIFF REGION] {reg.description}
                    </div>
                  ))}
                </div>
              </div>

              {/* Original Clipped Foreground */}
              <div
                style={{ width: `${sliderPosition}%` }}
                className="absolute inset-y-0 left-0 overflow-hidden bg-emerald-50 dark:bg-slate-800 border-r-2 border-[#0F766E] p-5 flex flex-col justify-between z-10"
              >
                <div className="flex justify-between text-xs whitespace-nowrap">
                  <span className="font-bold text-[#16A34A]">ORIGINAL AUTHENTIC LAYER</span>
                  <span className="font-mono text-stone-700 dark:text-slate-200 ml-4">
                    {activePreset.originalDoc.templateRenderData.secondaryInfo}
                  </span>
                </div>
                <div className="text-xs text-stone-700 dark:text-slate-300 whitespace-nowrap">
                  All cryptographic hashes, font baselines, and row sums verified intact.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Extracted Field Text Diff Table (FR-X2) */}
        <div className="pt-2">
          <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-2.5 flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-[#0F766E]" />
            Field-by-Field Text & Arithmetic Diff Table (FR-X2)
          </h3>
          <div className="overflow-x-auto border border-stone-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 text-stone-500">
                  <th className="py-2.5 px-4">Field Name</th>
                  <th className="py-2.5 px-4">Original Value</th>
                  <th className="py-2.5 px-4">Suspect Value</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-slate-800">
                {fieldDiffs.map((diff) => (
                  <tr
                    key={diff.fieldName}
                    className={
                      diff.changed ? 'bg-red-50/50 dark:bg-red-950/25' : ''
                    }
                  >
                    <td className="py-2.5 px-4 font-medium text-stone-900 dark:text-white">
                      {diff.fieldName}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-stone-700 dark:text-slate-300">
                      {diff.originalValue}
                    </td>
                    <td className="py-2.5 px-4 font-mono font-semibold text-stone-900 dark:text-white">
                      {diff.suspectValue}
                    </td>
                    <td className="py-2.5 px-4">
                      {diff.changed ? (
                        <span className="font-semibold text-[#DC2626]">
                          Modified / Tampered
                        </span>
                      ) : (
                        <span className="text-[#16A34A] font-medium">Identical</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION 2: SENSITIVE-DATA REDACTION STUDIO (FR-D1 & FR-D2) */}
      <div className="bg-white dark:bg-[#111722] border border-stone-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-[#0F766E]">
              Privacy & Redaction Tool (FR-D1 / DPDP Act 2023 Compliance)
            </span>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white mt-0.5">
              One-Tap Sensitive Identifier Masking (Aadhaar, PAN, Phone)
            </h2>
            <p className="text-xs text-stone-600 dark:text-slate-400">
              Automatically detects and masks 12-digit Aadhaar numbers, 10-character PANs, and phone numbers before sharing or archiving.
            </p>
          </div>
          <span className="font-mono text-xs font-semibold text-[#0F766E]">
            {redactionOutput.redactionCount} Sensitive Identifiers Masked
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="redaction-source-input"
              className="block text-xs font-medium text-stone-700 dark:text-slate-300"
            >
              Unmasked Document Text / OCR Extract
            </label>
            <textarea
              id="redaction-source-input"
              rows={4}
              value={rawRedactionInput}
              onChange={(e) => setRawRedactionInput(e.target.value)}
              className="w-full p-3 text-xs font-mono rounded-xl border border-stone-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-stone-900 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-700 dark:text-slate-300">
                Redacted Output (Safe to Share)
              </span>
              <button
                type="button"
                onClick={handleCopyRedacted}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#0F766E] hover:underline cursor-pointer"
              >
                {copiedRedacted ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Masked Text
                  </>
                )}
              </button>
            </div>
            <div
              data-testid="redacted-output-box"
              className="p-3 min-h-[100px] text-xs font-mono rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-100/80 dark:bg-slate-800/70 text-stone-900 dark:text-slate-100 leading-relaxed"
            >
              {redactionOutput.redactedText}
            </div>
          </div>
        </div>

        {/* Consent & DPDP Transparency Strip (FR-D2) */}
        <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex items-start gap-3 text-xs text-stone-600 dark:text-slate-400">
          <Shield className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
          <div>
            <strong className="text-stone-900 dark:text-white">
              DPDP Act 2023 & UIDAI Privacy Guarantee (FR-D2):{' '}
            </strong>
            Full Aadhaar numbers are never stored in persistent logs. OCR and LLM providers process only masked or transient chunks under zero-training data-processing agreements.
          </div>
        </div>
      </div>
    </div>
  );
};
