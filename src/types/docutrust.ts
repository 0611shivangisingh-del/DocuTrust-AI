export type DocumentCategory =
  | 'aadhaar'
  | 'pan'
  | 'marks_card'
  | 'certificate'
  | 'bank_statement'
  | 'legal_agreement'
  | 'other';

export type VerdictBand =
  | 'Looks authentic'
  | 'Needs review'
  | 'Likely tampered'
  | 'Inconclusive';

export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export type SeverityLevel = 'Critical' | 'Warning' | 'Info';

export type SupportedLanguageCode =
  | 'en'
  | 'hi'
  | 'ta'
  | 'te'
  | 'bn'
  | 'mr'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'or'
  | 'ur';

export type ReadingLevel = 'Simple' | 'Standard' | 'Detailed';

export type RetentionPolicy = 'delete_after_check' | '24_hours' | '30_days';

export interface BoundingBox {
  id: string;
  pinNumber: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage 0-100
  height: number; // percentage 0-100
  severity: SeverityLevel;
  label: string;
}

export interface ForensicModuleResult {
  id:
    | 'pixel_forensics'
    | 'field_validation'
    | 'text_font_consistency'
    | 'metadata_structure'
    | 'layout_template'
    | 'qr_signature';
  name: string;
  weight: number; // percentage weight in PRD (e.g., 30, 25, 20, 15, 10)
  applicable: boolean;
  score: number; // 0-100
  confidence: ConfidenceLevel;
  summary: string;
  details: string[];
}

export interface ForensicFinding {
  id: string;
  pinNumber?: number;
  module: string;
  severity: SeverityLevel;
  title: string;
  whatThisMeans: string;
  whatToDoNext: string;
  bbox?: BoundingBox;
  page: number;
}

export interface ExtractedField {
  id: string;
  name: string;
  valueRaw: string;
  valueMasked: string;
  sensitive: boolean;
  valid: boolean;
  ruleChecked: string;
  errorReason?: string;
}

export interface BankStatementRow {
  rowNumber: number;
  date: string;
  description: string;
  reference: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface MarksSubjectRow {
  subjectCode: string;
  subjectName: string;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  maxMarks: number;
}

export interface VerificationReport {
  id: string;
  reportId: string;
  documentId: string;
  documentName: string;
  documentType: DocumentCategory;
  detectedConfidence: number; // 0-100
  fileSize: string;
  pages: number;
  sha256Hash: string;
  createdAt: string;
  expiresAt: string;
  score: number;
  confidence: ConfidenceLevel;
  verdict: VerdictBand;
  oneSentenceVerdict: string;
  hardFailTriggered: boolean;
  hardFailReasons: string[];
  modules: ForensicModuleResult[];
  findings: ForensicFinding[];
  extractedFields: ExtractedField[];
  bankRows?: BankStatementRow[];
  marksRows?: MarksSubjectRow[];
  templateRenderData: {
    issuerTitle: string;
    subtitle: string;
    holderName: string;
    idNumber: string;
    issueDate: string;
    secondaryInfo: string;
    qrStatus: 'verified' | 'mismatch' | 'none';
    sealStatus: 'authentic' | 'resampled' | 'none';
    customImageDataUrl?: string;
  };
}

export interface LegalClause {
  id: string;
  clauseNumber: string;
  title: string;
  originalText: string;
  simplifiedText: Record<ReadingLevel, string>;
  riskLevel: 'Red' | 'Amber' | 'Green';
  riskReason?: string;
}

export interface LegalGlossaryItem {
  term: string;
  originalTermBracketed: string;
  definition: string;
  clauseRef: string;
}

export interface LegalKeyFact {
  label: string;
  value: string;
  clauseRef: string;
}

export interface LegalDocumentAnalysis {
  id: string;
  documentId: string;
  title: string;
  agreementType:
    | 'Rental Agreement'
    | 'Employment Contract'
    | 'Loan Agreement'
    | 'Non-Disclosure Agreement'
    | 'Sale Deed'
    | 'Affidavit';
  pages: number;
  sha256Hash: string;
  createdAt: string;
  translations: Record<
    SupportedLanguageCode,
    {
      inShortSummary: Record<ReadingLevel, string>;
      partyAObligations: string[];
      partyBObligations: string[];
      keyFacts: LegalKeyFact[];
      riskFlags: {
        id: string;
        level: 'Red' | 'Amber' | 'Green';
        clauseNumber: string;
        title: string;
        oneLineReason: string;
      }[];
      questionsToAsk: string[];
      clauses: LegalClause[];
      glossary: LegalGlossaryItem[];
    }
  >;
}

export interface ChatCitationMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  citedClauses: string[];
  timestamp: string;
}

export interface ComparePairPreset {
  id: string;
  title: string;
  documentType: DocumentCategory;
  description: string;
  originalDoc: VerificationReport;
  suspectDoc: VerificationReport;
  pixelDiffRegions: {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    description: string;
    severity: SeverityLevel;
  }[];
}
