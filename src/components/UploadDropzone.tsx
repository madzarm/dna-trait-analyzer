"use client";

import { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card
      className={`border-2 transition-all duration-300 ${
        isDragging
          ? "border-solid border-primary bg-primary/5 shadow-[0_0_24px_rgba(45,212,191,0.15)]"
          : "border-dashed border-primary/40 hover:border-primary/60"
      }`}
    >
      <CardContent className="p-0">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center gap-5 p-12 md:p-16 text-center transition-colors rounded-lg"
        >
          {isUploading ? (
            <>
              <Dna className="h-10 w-10 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">{progress}</p>
              {/* Progress bar */}
              <div className="w-full max-w-xs h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500 ease-out"
                  style={{ width: `${uploadPercent}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <Dna className="h-10 w-10 text-primary animate-pulse" />
              <div>
                <h3 className="text-lg font-semibold">
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
                <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                  <Upload className="h-4 w-4" />
                  Browse files
                </span>
              </label>
              {/* Format chips */}
              <div className="flex flex-wrap justify-center gap-2 mt-1">
                {SUPPORTED_FORMATS.map((fmt) => (
                  <span
                    key={fmt}
                    className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-mono text-muted-foreground"
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
      </CardContent>
    </Card>
  );
}
