import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { parseDNAFile } from "@/lib/dna-parser";
import { storeDNA } from "@/lib/dna-store";

export async function POST(request: Request) {
  try {
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
