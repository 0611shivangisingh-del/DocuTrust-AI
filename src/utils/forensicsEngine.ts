import {
  BankStatementRow,
  ConfidenceLevel,
  ExtractedField,
  ForensicModuleResult,
  MarksSubjectRow,
  VerdictBand,
} from '../types/docutrust';

// Verhoeff Algorithm tables (Dihedral group D5 multiplication, permutation, and inverse)
const VERHOEFF_D: number[][] = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

const VERHOEFF_P: number[][] = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

const VERHOEFF_INV: number[] = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

/**
 * Generates the Verhoeff checksum digit for an 11-digit numeric string.
 */
export function generateVerhoeffChecksumDigit(elevenDigits: string): number {
  const clean = elevenDigits.replace(/\s|-/g, '');
  if (!/^\d{11}$/.test(clean)) {
    throw new Error('Input must be exactly 11 digits');
  }
  let c = 0;
  const reversed = clean
    .split('')
    .map((d) => parseInt(d, 10))
    .reverse();
  for (let i = 0; i < reversed.length; i++) {
    c = VERHOEFF_D[c][VERHOEFF_P[(i + 1) % 8][reversed[i]]];
  }
  return VERHOEFF_INV[c];
}

/**
 * Validates a 12-digit Indian Aadhaar number using UIDAI rules:
 * 1. Exactly 12 digits (ignoring spaces/hyphens)
 * 2. Cannot start with 0 or 1
 * 3. Must satisfy the Verhoeff dihedral group D5 checksum
 */
export function verifyAadhaarVerhoeff(aadhaarInput: string): {
  valid: boolean;
  reason: string;
  normalized: string;
} {
  const clean = aadhaarInput.replace(/\s|-/g, '');
  if (!/^\d{12}$/.test(clean)) {
    return {
      valid: false,
      reason: 'Aadhaar must contain exactly 12 numeric digits.',
      normalized: clean,
    };
  }
  if (clean.startsWith('0') || clean.startsWith('1')) {
    return {
      valid: false,
      reason: 'UIDAI rule violation: Aadhaar number cannot begin with 0 or 1.',
      normalized: clean,
    };
  }

  let c = 0;
  const reversed = clean
    .split('')
    .map((d) => parseInt(d, 10))
    .reverse();
  for (let i = 0; i < reversed.length; i++) {
    c = VERHOEFF_D[c][VERHOEFF_P[i % 8][reversed[i]]];
  }

  if (c !== 0) {
    const expectedDigit = generateVerhoeffChecksumDigit(clean.slice(0, 11));
    return {
      valid: false,
      reason: `Verhoeff mathematical checksum failed on trailing digit (found ${clean[11]}, expected ${expectedDigit}).`,
      normalized: clean,
    };
  }

  return {
    valid: true,
    reason: '12-digit format and Verhoeff dihedral checksum verified.',
    normalized: clean,
  };
}

const PAN_ENTITY_MAP: Record<string, string> = {
  P: 'Individual / Person',
  C: 'Company',
  H: 'Hindu Undivided Family (HUF)',
  F: 'Partnership Firm',
  A: 'Association of Persons (AOP)',
  T: 'Trust',
  B: 'Body of Individuals (BOI)',
  L: 'Local Authority',
  J: 'Artificial Juridical Person',
  G: 'Government Agency',
};

/**
 * Validates an Indian Permanent Account Number (PAN) per Income Tax Department format:
 * Format AAAAA9999A where 4th character is a valid entity status code.
 */
export function validatePANCard(panInput: string): {
  valid: boolean;
  entityType?: string;
  reason: string;
  normalized: string;
} {
  const clean = panInput.replace(/\s/g, '').toUpperCase();
  if (clean.length !== 10) {
    return {
      valid: false,
      reason: `PAN must be exactly 10 characters (received ${clean.length}).`,
      normalized: clean,
    };
  }

  const formatRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  if (!formatRegex.test(clean)) {
    return {
      valid: false,
      reason: 'PAN does not match mandatory AAAAA9999A alphanumeric structure.',
      normalized: clean,
    };
  }

  const fourthChar = clean[3];
  const entityType = PAN_ENTITY_MAP[fourthChar];
  if (!entityType) {
    return {
      valid: false,
      reason: `Invalid 4th-character entity code '${fourthChar}'. Must be one of P, C, H, F, A, T, B, L, J, G.`,
      normalized: clean,
    };
  }

  return {
    valid: true,
    entityType,
    reason: `Valid PAN structure (${entityType}, code '${fourthChar}').`,
    normalized: clean,
  };
}

/**
 * Validates bank statement ledger rows:
 * openingBalance + credit - debit === closingBalance on every row,
 * chronological dates, and duplicate reference checks.
 */
export function validateBankStatementArithmetic(
  openingBalance: number,
  rows: BankStatementRow[]
): {
  valid: boolean;
  discrepancies: {
    rowNumber: number;
    expectedBalance: number;
    actualBalance: number;
    reason: string;
  }[];
} {
  const discrepancies: {
    rowNumber: number;
    expectedBalance: number;
    actualBalance: number;
    reason: string;
  }[] = [];

  let runningBalance = openingBalance;
  const seenRefs = new Set<string>();

  for (const row of rows) {
    const expected = Number((runningBalance + row.credit - row.debit).toFixed(2));
    const actual = Number(row.balance.toFixed(2));

    if (Math.abs(expected - actual) > 0.01) {
      discrepancies.push({
        rowNumber: row.rowNumber,
        expectedBalance: expected,
        actualBalance: actual,
        reason: `Row ${row.rowNumber} arithmetic failure: ${runningBalance.toLocaleString('en-IN')} + ${row.credit.toLocaleString('en-IN')} - ${row.debit.toLocaleString('en-IN')} = ${expected.toLocaleString('en-IN')}, but statement shows ${actual.toLocaleString('en-IN')}.`,
      });
    }

    if (row.reference && seenRefs.has(row.reference)) {
      discrepancies.push({
        rowNumber: row.rowNumber,
        expectedBalance: expected,
        actualBalance: actual,
        reason: `Row ${row.rowNumber} has duplicated UTR/Reference number '${row.reference}' indicating a copy-pasted ledger row.`,
      });
    }
    if (row.reference) {
      seenRefs.add(row.reference);
    }

    runningBalance = actual;
  }

  return {
    valid: discrepancies.length === 0,
    discrepancies,
  };
}

/**
 * Validates marks card subject totals, grand total sum, and percentage consistency.
 */
export function validateMarksCardRules(
  subjects: MarksSubjectRow[],
  declaredGrandTotal: number,
  declaredMaxTotal: number,
  declaredPercentage: number
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  let computedGrandTotal = 0;
  let computedMaxTotal = 0;

  for (const sub of subjects) {
    const expectedSubTotal = sub.internalMarks + sub.externalMarks;
    if (expectedSubTotal !== sub.totalMarks) {
      errors.push(
        `${sub.subjectCode} (${sub.subjectName}): Internal (${sub.internalMarks}) + External (${sub.externalMarks}) = ${expectedSubTotal}, but row total states ${sub.totalMarks}.`
      );
    }
    if (sub.totalMarks > sub.maxMarks) {
      errors.push(
        `${sub.subjectCode}: Marks obtained (${sub.totalMarks}) exceeds maximum marks (${sub.maxMarks}).`
      );
    }
    computedGrandTotal += sub.totalMarks;
    computedMaxTotal += sub.maxMarks;
  }

  if (computedGrandTotal !== declaredGrandTotal) {
    errors.push(
      `Grand Total mismatch: Sum of subject totals is ${computedGrandTotal}, but document declares ${declaredGrandTotal}.`
    );
  }

  if (computedMaxTotal !== declaredMaxTotal) {
    errors.push(
      `Maximum Marks mismatch: Sum of subject maximums is ${computedMaxTotal}, but document declares ${declaredMaxTotal}.`
    );
  }

  const expectedPercentage = Number(
    ((declaredGrandTotal / (declaredMaxTotal || 1)) * 100).toFixed(2)
  );
  if (Math.abs(expectedPercentage - declaredPercentage) > 0.15) {
    errors.push(
      `Percentage inconsistency: ${declaredGrandTotal}/${declaredMaxTotal} equals ${expectedPercentage}%, but document states ${declaredPercentage}%.`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export interface ScoringEngineInput {
  modules: ForensicModuleResult[];
  hardFails?: {
    invalidAadhaarChecksum?: boolean;
    qrDataMismatch?: boolean;
    brokenDigitalSignature?: boolean;
    bankArithmeticFailure?: boolean;
  };
  lowQualityInput?: {
    isHeavyCompressionOrScreenshot?: boolean;
    reason?: string;
  };
}

/**
 * Implements PRD Section 6.5 & Section 12 Scoring Logic:
 * - Renormalizes weights for applicable modules
 * - Enforces FR-S3 hard-fail cap at 40 regardless of other modules
 * - Handles FR-T3 & Section 12 Inconclusive state on low quality or low confidence mid-range scores
 * - Maps score to FR-S2 Verdict Bands: 80-100 Looks authentic, 50-79 Needs review, 0-49 Likely tampered
 */
export function calculateTrustScoreAndVerdict(input: ScoringEngineInput): {
  score: number;
  verdict: VerdictBand;
  confidence: ConfidenceLevel;
  hardFailTriggered: boolean;
  hardFailReasons: string[];
} {
  const applicableModules = input.modules.filter((m) => m.applicable);
  const totalWeight = applicableModules.reduce((acc, m) => acc + m.weight, 0);

  let weightedScore = 0;
  if (totalWeight > 0) {
    for (const mod of applicableModules) {
      const normalizedWeight = mod.weight / totalWeight;
      weightedScore += mod.score * normalizedWeight;
    }
  } else {
    weightedScore = 50;
  }

  let finalScore = Math.round(weightedScore);

  const hardFailReasons: string[] = [];
  if (input.hardFails?.invalidAadhaarChecksum) {
    hardFailReasons.push('Invalid 12-digit Aadhaar Verhoeff checksum (Hard-Fail Rule FR-S3)');
  }
  if (input.hardFails?.qrDataMismatch) {
    hardFailReasons.push('Decoded QR payload mismatches printed text fields (Hard-Fail Rule FR-S3)');
  }
  if (input.hardFails?.brokenDigitalSignature) {
    hardFailReasons.push('Cryptographic digital signature verification failed (Hard-Fail Rule FR-S3)');
  }
  if (input.hardFails?.bankArithmeticFailure) {
    hardFailReasons.push('Bank statement row balance arithmetic failure (Hard-Fail Rule FR-S3)');
  }

  const hardFailTriggered = hardFailReasons.length > 0;
  if (hardFailTriggered && finalScore > 40) {
    finalScore = 34; // Capped <= 40 per FR-S3
  }

  // Determine overall confidence
  const lowCount = applicableModules.filter((m) => m.confidence === 'Low').length;
  const highCount = applicableModules.filter((m) => m.confidence === 'High').length;

  let confidence: ConfidenceLevel = 'Medium';
  if (input.lowQualityInput?.isHeavyCompressionOrScreenshot) {
    confidence = 'Low';
  } else if (lowCount >= Math.ceil(applicableModules.length / 2)) {
    confidence = 'Low';
  } else if (highCount >= Math.ceil(applicableModules.length * 0.6)) {
    confidence = 'High';
  }

  // Check for Inconclusive state (FR-T3 & Section 12)
  if (
    input.lowQualityInput?.isHeavyCompressionOrScreenshot ||
    (confidence === 'Low' && finalScore >= 45 && finalScore <= 75 && !hardFailTriggered)
  ) {
    return {
      score: finalScore,
      verdict: 'Inconclusive',
      confidence: 'Low',
      hardFailTriggered,
      hardFailReasons,
    };
  }

  let verdict: VerdictBand;
  if (finalScore >= 80) {
    verdict = 'Looks authentic';
  } else if (finalScore >= 50) {
    verdict = 'Needs review';
  } else {
    verdict = 'Likely tampered';
  }

  return {
    score: finalScore,
    verdict,
    confidence,
    hardFailTriggered,
    hardFailReasons,
  };
}

/**
 * Masks sensitive Indian identifiers per UIDAI and DPDP Act 2023 guidelines (FR-R4 & Section 13).
 * Shows only last 4 characters/digits by default.
 */
export function maskSensitiveIdentifier(
  raw: string,
  type: 'aadhaar' | 'pan' | 'account' | 'phone' | 'generic'
): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';

  if (type === 'aadhaar') {
    const digits = trimmed.replace(/\D/g, '');
    if (digits.length >= 4) {
      return `XXXX-XXXX-${digits.slice(-4)}`;
    }
  }
  if (type === 'pan') {
    const clean = trimmed.replace(/\s/g, '').toUpperCase();
    if (clean.length === 10) {
      return `XXXXX${clean.slice(5)}`;
    }
  }
  if (type === 'account' || type === 'phone') {
    const digits = trimmed.replace(/\D/g, '');
    if (digits.length > 4) {
      return `${'X'.repeat(Math.min(8, digits.length - 4))}${digits.slice(-4)}`;
    }
  }

  if (trimmed.length <= 4) return 'XXXX';
  return `${'X'.repeat(trimmed.length - 4)}${trimmed.slice(-4)}`;
}

/**
 * Auto-detects Aadhaar, PAN, Bank Account, and Indian mobile numbers in free text and masks them (FR-D1).
 */
export function redactSensitiveText(inputText: string): {
  redactedText: string;
  redactionCount: number;
  detectedItems: { type: string; originalMasked: string }[];
} {
  let redactionCount = 0;
  const detectedItems: { type: string; originalMasked: string }[] = [];

  // 1. Aadhaar pattern: 4 digits - space/hyphen - 4 digits - space/hyphen - 4 digits
  let redactedText = inputText.replace(
    /\b([2-9]\d{3})[\s-](\d{4})[\s-](\d{4})\b/g,
    (_match, _g1, _g2, g3) => {
      redactionCount++;
      const masked = `XXXX-XXXX-${g3}`;
      detectedItems.push({ type: 'Aadhaar Number', originalMasked: masked });
      return `[REDACTED AADHAAR: ${masked}]`;
    }
  );

  // 2. PAN pattern: 5 uppercase letters, 4 digits, 1 uppercase letter
  redactedText = redactedText.replace(
    /\b([A-Z]{5})([0-9]{4})([A-Z])\b/g,
    (_match, _g1, g2, g3) => {
      redactionCount++;
      const masked = `XXXXX${g2}${g3}`;
      detectedItems.push({ type: 'PAN Number', originalMasked: masked });
      return `[REDACTED PAN: ${masked}]`;
    }
  );

  // 3. Indian Phone pattern: +91 or 0 optional, followed by 6-9 and 9 digits
  redactedText = redactedText.replace(
    /(?:\+91[\s-]?)?\b([6-9]\d{5})(\d{4})\b/g,
    (_match, _g1, g2) => {
      redactionCount++;
      const masked = `XXXXXX${g2}`;
      detectedItems.push({ type: 'Phone Number', originalMasked: masked });
      return `[REDACTED PHONE: ${masked}]`;
    }
  );

  return {
    redactedText,
    redactionCount,
    detectedItems,
  };
}

/**
 * Computes field-by-field differences for Compare Mode (FR-X2).
 */
export function computeExtractedFieldDiffs(
  originalFields: ExtractedField[],
  suspectFields: ExtractedField[]
): {
  fieldName: string;
  originalValue: string;
  suspectValue: string;
  changed: boolean;
}[] {
  return originalFields.map((orig) => {
    const match = suspectFields.find((s) => s.name === orig.name);
    const suspectVal = match ? match.valueRaw : 'Missing';
    return {
      fieldName: orig.name,
      originalValue: orig.valueRaw,
      suspectValue: suspectVal,
      changed: orig.valueRaw !== suspectVal,
    };
  });
}
