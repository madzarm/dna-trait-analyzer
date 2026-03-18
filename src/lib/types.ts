export interface SNPData {
  rsid: string;
  chromosome: string;
  position: string;
  result: string;
}

export type EvidenceStrength = "strong" | "moderate" | "preliminary";

export interface SNPAssociation {
  rsid: string;
  gene: string;
  riskAllele: string;
  effect: string;
  evidenceStrength: EvidenceStrength;
  effectSize: string;
  source: string;
}

export interface SNPMatch {
  rsid: string;
  gene: string;
  userGenotype: string;
  riskAllele: string;
  effect: string;
  hasRiskAllele: boolean;
  evidenceStrength: EvidenceStrength;
  effectSize: string;
  source: string;
}

export interface AnalysisResult {
  trait: string;
  summary: string;
  confidence: number;
  snpMatches: SNPMatch[];
  interpretation: string;
  disclaimer: string;
  sources: string[];
}

export interface ClinVarData {
  rsid: string;
  variantId: string;
  gene: string;
  clinicalSignificance: string;
  conditions: ClinVarCondition[];
  reviewStatus: string;
  starRating: number;
  citations: string[];
}

export interface ClinVarCondition {
  name: string;
  clinicalSignificance: string;
  lastEvaluated?: string;
}

export interface GWASAssociation {
  rsid: string;
  gene: string;
  trait: string;
  pValue: number;
  effectSize: string;
  riskAllele: string;
  studyId: string;
  pubmedId: string;
  sampleSize: number;
  ancestries: string[];
}

export interface UploadResult {
  sessionId: string;
  snpCount: number;
}

export interface ProgressEvent {
  type: "progress" | "snps_found" | "result" | "error";
  phase?: string;
  message?: string;
  snpCount?: number;
  data?: AnalysisResult;
  reportId?: string;
}
