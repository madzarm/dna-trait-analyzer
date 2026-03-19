import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { parseDNAFile } from "@/lib/dna-parser";
import { storeDNA } from "@/lib/dna-store";
import type { SNPData } from "@/lib/types";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    // New path: client-side parsed JSON with compact {rsid: genotype} map
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

      const sessionId = uuidv4();
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
