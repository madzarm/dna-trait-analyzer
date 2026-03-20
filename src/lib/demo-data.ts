/**
 * Hardcoded sample SNP dataset for the demo flow.
 * Extracted from test-data/sample-23andme.txt (excluding no-call rows).
 * These are well-studied SNPs covering caffeine, lactose, MTHFR, APOE, etc.
 */

export const DEMO_SNPS: Record<string, string> = {
  rs762551: "AC",    // CYP1A2 — caffeine metabolism
  rs4988235: "CT",   // MCM6/LCT — lactose tolerance
  rs1801133: "CT",   // MTHFR — folate metabolism
  rs1815739: "CC",   // ACTN3 — muscle fiber type
  rs4680: "AG",      // COMT — dopamine metabolism
  rs53576: "GG",     // OXTR — oxytocin receptor
  rs1800497: "AG",   // ANKK1/DRD2 — dopamine receptor
  rs7903146: "CT",   // TCF7L2 — type 2 diabetes risk
  rs12913832: "AG",  // HERC2 — eye color
  rs1799971: "AA",   // OPRM1 — opioid receptor
  rs4420638: "AG",   // APOC1/APOE — Alzheimer's risk factor
  rs9939609: "TA",   // FTO — obesity association
  rs429358: "TT",    // APOE — e4 allele status
  rs7412: "CC",      // APOE — e2 allele status
  rs6025: "CC",      // F5 — Factor V Leiden
  rs1805007: "CC",   // MC1R — red hair/skin pigmentation
  rs1042522: "GC",   // TP53 — tumor suppressor
  rs334: "AA",       // HBB — sickle cell
  rs1800795: "GC",   // IL6 — inflammation
  rs10811661: "CT",  // CDKN2A/B — diabetes risk
  rs174547: "TC",    // FADS1 — fatty acid metabolism
};

export const DEMO_SNP_COUNT = Object.keys(DEMO_SNPS).length;

export const DEMO_SESSION_PREFIX = "demo-";
