import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { parseDNAFile } from "@/lib/dna-parser";
import { storeDNA } from "@/lib/dna-store";
import { DEMO_SESSION_PREFIX } from "@/lib/demo-data";
import type { SNPData } from "@/lib/types";
import { gunzipSync } from "node:zlib";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    // New path: client-side parsed, gzipped TSV (rsid\tgenotype per line)
    if (contentType.includes("application/octet-stream")) {
      const format = request.headers.get("x-snp-format") || "unknown";
      const arrayBuffer = await request.arrayBuffer();
      const compressed = Buffer.from(arrayBuffer);
      const decompressed = gunzipSync(compressed);
      const tsvData = decompressed.toString("utf-8");

      const dnaMap = new Map<string, SNPData>();
      const lines = tsvData.split("\n");
      for (const line of lines) {
        if (!line) continue;
        const tabIdx = line.indexOf("\t");
        if (tabIdx === -1) continue;
        const rsid = line.substring(0, tabIdx);
        const genotype = line.substring(tabIdx + 1);
        if (rsid && genotype) {
          dnaMap.set(rsid, {
            rsid,
            chromosome: "",
            position: "",
            result: genotype,
          });
        }
      }

      if (dnaMap.size === 0) {
        return NextResponse.json(
          { error: "No valid SNP data found." },
          { status: 400 }
        );
      }

      const sessionId = uuidv4();
      storeDNA(sessionId, dnaMap, dnaMap.size);

      return NextResponse.json({
        sessionId,
        snpCount: dnaMap.size,
        format,
      });
    }

    // JSON path: client-side parsed compact {rsid: genotype} map
    if (contentType.includes("application/json")) {
      const body = await request.json();
      const { snps, format } = body as {
        snps: Record<string, string>;
        format: string;
      };

      if (!snps || typeof snps !== "object") {
        return NextResponse.json(
          { error: "Invalid upload data" },
          { status: 400 }
        );
      }

      const dnaMap = new Map<string, SNPData>();
      for (const [rsid, genotype] of Object.entries(snps)) {
        dnaMap.set(rsid, {
          rsid,
          chromosome: "",
          position: "",
          result: genotype,
        });
      }

      if (dnaMap.size === 0) {
        return NextResponse.json(
          { error: "No valid SNP data found." },
          { status: 400 }
        );
      }

      // Demo uploads get a demo-prefixed session ID for usage exemption
      const isDemo = typeof format === "string" && format.startsWith("demo-");
      const sessionId = isDemo ? `${DEMO_SESSION_PREFIX}${uuidv4()}` : uuidv4();
      storeDNA(sessionId, dnaMap, dnaMap.size);

      return NextResponse.json({
        sessionId,
        snpCount: dnaMap.size,
        format: format || "unknown",
      });
    }

    // Legacy path: raw file upload via FormData
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const validExtensions = [".csv", ".txt", ".tsv"];
    const hasValidExtension = validExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );
    if (!hasValidExtension) {
      return NextResponse.json(
        { error: "Please upload a DNA data file (.csv, .txt, or .tsv)" },
        { status: 400 }
      );
    }

    const fileContent = await file.text();
    const result = parseDNAFile(fileContent);

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const sessionId = uuidv4();
    storeDNA(sessionId, result.dnaMap, result.snpCount);

    return NextResponse.json({
      sessionId,
      snpCount: result.snpCount,
      format: result.format,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Failed to process the DNA file. Please try again." },
      { status: 500 }
    );
  }
}
