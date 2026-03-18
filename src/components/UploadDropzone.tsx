"use client";

import { useCallback, useState } from "react";
import { Dna, Upload } from "lucide-react";

interface UploadDropzoneProps {
  onUploadComplete: (sessionId: string, snpCount: number) => void;
}

const SUPPORTED_FORMATS = [".csv", ".txt", ".tsv"];

export function UploadDropzone({ onUploadComplete }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [uploadPercent, setUploadPercent] = useState(0);
  const [error, setError] = useState("");

  const handleFile = useCallback(
    async (file: File) => {
      setError("");

      const validExtensions = [".csv", ".txt", ".tsv"];
      if (!validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))) {
        setError("Please upload a DNA data file (.csv, .txt, or .tsv).");
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        setError("File is too large. Maximum size is 50MB.");
        return;
      }

      setIsUploading(true);
      setProgress("Reading file...");
      setUploadPercent(20);

      try {
        const formData = new FormData();
        formData.append("file", file);

        setProgress("Parsing DNA data...");
        setUploadPercent(50);
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        setUploadPercent(80);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Upload failed");
          setIsUploading(false);
          setUploadPercent(0);
          return;
        }

        setUploadPercent(100);
        setProgress(`Loaded ${data.snpCount.toLocaleString()} SNPs`);
        onUploadComplete(data.sessionId, data.snpCount);
      } catch {
        setError("Upload failed. Please try again.");
        setIsUploading(false);
        setUploadPercent(0);
      }
    },
    [onUploadComplete]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div
      className={`rounded-2xl border-2 transition-all duration-300 ${
        isDragging
          ? "border-solid border-primary bg-primary/5 shadow-[0_0_30px_var(--glow-primary)]"
          : "border-dashed border-border/50 hover:border-primary/40"
      }`}
    >
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center gap-4 p-10 md:p-14 text-center"
      >
        {isUploading ? (
          <>
            <Dna className="h-8 w-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">{progress}</p>
            <div className="w-full max-w-xs h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${uploadPercent}%` }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="h-12 w-12 rounded-xl bg-primary/8 flex items-center justify-center">
              <Upload className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold font-display">
                Drop your DNA file here
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Supports 23andMe, AncestryDNA, MyHeritage, and FTDNA
              </p>
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".csv,.txt,.tsv"
                onChange={handleFileInput}
                className="hidden"
              />
              <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium border border-input bg-background hover:bg-muted/50 h-9 px-5 py-2 transition-colors">
                Browse files
              </span>
            </label>
            <div className="flex items-center gap-3 mt-1">
              {SUPPORTED_FORMATS.map((fmt) => (
                <span
                  key={fmt}
                  className="text-[10px] font-mono text-muted-foreground/50 tracking-wider"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </>
        )}

        {error && (
          <p className="text-sm text-destructive font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}
