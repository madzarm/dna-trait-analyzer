export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  trait: string;
  summary: string;
  confidence: number;
  snp_matches: SnpMatchRow[];
  interpretation: string;
  disclaimer: string;
  sources: string[];
  share_token: string | null;
  is_public: boolean;
  created_at: string;
}

export interface SnpMatchRow {
  rsid: string;
  gene: string;
  userGenotype: string;
  riskAllele: string;
  effect: string;
  hasRiskAllele: boolean;
  evidenceStrength: string;
  effectSize: string;
  source: string;
}
