export interface SNPediaData {
  rsid: string;
  gene: string;
  chromosome: string;
  description: string;
  genotypes: SNPediaGenotype[];
  populationFrequencies: Record<string, Record<string, number>>;
  references: string[];
}

export interface SNPediaGenotype {
  allele1: string;
  allele2: string;
  magnitude: number;
  summary: string;
  description: string;
}

const SNPEDIA_API = "https://bots.snpedia.com/api.php";

async function fetchWikitext(page: string): Promise<string | null> {
  try {
    const url = `${SNPEDIA_API}?action=parse&page=${encodeURIComponent(page)}&format=json&prop=wikitext`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.parse?.wikitext?.["*"] ?? null;
  } catch {
    return null;
  }
}

function extractTemplateField(text: string, field: string): string {
  const regex = new RegExp(`\\|${field}=([^\\n|\\}]*)`, "i");
  const match = text.match(regex);
  return match?.[1]?.trim() ?? "";
}

function extractPMIDs(text: string): string[] {
  const matches = text.matchAll(/\{\{PMID\|(\d+)/g);
  return [...matches].map((m) => `PMID:${m[1]}`);
}

function parsePopulationFrequencies(
  text: string
): Record<string, Record<string, number>> {
  const freqs: Record<string, Record<string, number>> = {};
  const popBlock = text.match(
    /\{\{\s*population diversity[\s\S]*?\}\}/i
  );
  if (!popBlock) return freqs;

  // Extract geno names
  const geno1 = extractTemplateField(popBlock[0], "geno1");
  const geno2 = extractTemplateField(popBlock[0], "geno2");
  const geno3 = extractTemplateField(popBlock[0], "geno3");

  // Parse population lines: | POP | freq1 | freq2 | freq3
  const popLines = popBlock[0].matchAll(
    /\|\s*([A-Z]{3})\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)/g
  );
  for (const m of popLines) {
    const pop = m[1];
    freqs[pop] = {};
    if (geno1) freqs[pop][geno1] = parseFloat(m[2]);
    if (geno2) freqs[pop][geno2] = parseFloat(m[3]);
    if (geno3) freqs[pop][geno3] = parseFloat(m[4]);
  }

  return freqs;
}

function stripWikiMarkup(text: string): string {
  return text
    .replace(/\{\{[^}]*\}\}/g, "") // remove templates
    .replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, "$2") // [[link|text]] -> text
    .replace(/'''?/g, "") // bold/italic
    .replace(/\n{3,}/g, "\n\n") // collapse newlines
    .trim();
}

export async function lookupSNP(rsid: string): Promise<SNPediaData | null> {
  // Normalize: rs762551 -> Rs762551
  const pageId = "Rs" + rsid.replace(/^rs/i, "");

  const wikitext = await fetchWikitext(pageId);
  if (!wikitext) return null;

  const gene = extractTemplateField(wikitext, "Gene") || extractTemplateField(wikitext, "Gene_s");
  const chromosome = extractTemplateField(wikitext, "Chromosome");

  // Get description (text after the templates)
  const descriptionText = stripWikiMarkup(
    wikitext.replace(/\{\{[^}]*\}\}/g, "").trim()
  );

  const references = extractPMIDs(wikitext);
  const populationFrequencies = parsePopulationFrequencies(wikitext);

  // Fetch genotype pages
  const genoFields = ["geno1", "geno2", "geno3"];
  const genoValues = genoFields
    .map((f) => extractTemplateField(wikitext, f))
    .filter(Boolean);

  const genotypes: SNPediaGenotype[] = [];

  // Fetch genotype pages in parallel
  const genoPromises = genoValues.map(async (geno) => {
    // geno format: (A;A) -> page Rs762551(A;A)
    const genoPage = `${pageId}${geno}`;
    const genoText = await fetchWikitext(genoPage);
    if (!genoText) return null;

    const allele1 = extractTemplateField(genoText, "allele1");
    const allele2 = extractTemplateField(genoText, "allele2");
    const magnitude = parseFloat(extractTemplateField(genoText, "magnitude")) || 0;
    const summary = extractTemplateField(genoText, "summary");
    const description = stripWikiMarkup(
      genoText.replace(/\{\{[^}]*\}\}/g, "").trim()
    );

    return { allele1, allele2, magnitude, summary, description };
  });

  const genoResults = await Promise.all(genoPromises);
  for (const g of genoResults) {
    if (g) genotypes.push(g);
  }

  return {
    rsid: rsid.toLowerCase(),
    gene,
    chromosome,
    description: descriptionText,
    genotypes,
    populationFrequencies,
    references,
  };
}

export async function batchLookupSNPs(
  rsids: string[]
): Promise<Map<string, SNPediaData>> {
  const results = new Map<string, SNPediaData>();

  // Fetch in parallel, max 5 concurrent
  const chunks: string[][] = [];
  for (let i = 0; i < rsids.length; i += 5) {
    chunks.push(rsids.slice(i, i + 5));
  }

  for (const chunk of chunks) {
    const promises = chunk.map(async (rsid) => {
      const data = await lookupSNP(rsid);
      if (data) results.set(rsid.toLowerCase(), data);
    });
    await Promise.all(promises);
  }

  return results;
}

export function formatSNPediaContext(
  snpediaData: Map<string, SNPediaData>,
  userGenotypes: Map<string, string>
): string {
  const sections: string[] = [];

  for (const [rsid, data] of snpediaData) {
    const userGeno = userGenotypes.get(rsid);
    let section = `### ${rsid} (${data.gene || "Unknown gene"}, Chr${data.chromosome})`;

    if (data.description) {
      section += `\nSNPedia description: ${data.description.slice(0, 500)}`;
    }

    if (data.references.length > 0) {
      section += `\nReferences: ${data.references.join(", ")}`;
    }

    // Show all genotype interpretations
    for (const geno of data.genotypes) {
      const genoStr = `(${geno.allele1};${geno.allele2})`;
      const isUser = userGeno && (
        userGeno === `${geno.allele1}${geno.allele2}` ||
        userGeno === `${geno.allele2}${geno.allele1}`
      );
      section += `\n  ${genoStr} [magnitude ${geno.magnitude}]: ${geno.summary}`;
      if (isUser) section += ` ← USER'S GENOTYPE`;
      if (geno.description) section += `\n    Detail: ${geno.description.slice(0, 300)}`;
    }

    // Population frequencies
    const freqEntries = Object.entries(data.populationFrequencies);
    if (freqEntries.length > 0 && userGeno) {
      const ceu = data.populationFrequencies["CEU"];
      if (ceu) {
        section += `\n  European (CEU) population frequencies: ${Object.entries(ceu).map(([g, f]) => `${g}: ${f}%`).join(", ")}`;
      }
    }

    sections.push(section);
  }

  return sections.join("\n\n");
}
