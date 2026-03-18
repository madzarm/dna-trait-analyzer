"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface UploadDropzoneProps {
  onUploadComplete: (sessionId: string, snpCount: number) => void;
}

export function UploadDropzone({ onUploadComplete }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState("");
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

      try {
        const formData = new FormData();
        formData.append("file", file);

        setProgress("Parsing DNA data...");
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Upload failed");
          setIsUploading(false);
          return;
        }

        setProgress(`Loaded ${data.snpCount.toLocaleString()} SNPs`);
        onUploadComplete(data.sessionId, data.snpCount);
      } catch {
        setError("Upload failed. Please try again.");
        setIsUploading(false);
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
    <Card className="border-2 border-dashed transition-colors duration-200 hover:border-primary/50">
      <CardContent className="p-0">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center gap-4 p-12 text-center transition-colors rounded-lg ${
            isDragging ? "bg-primary/5" : ""
          }`}
        >
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
              <p className="text-sm text-muted-foreground">{progress}</p>
            </>
          ) : (
            <>
              <div className="text-4xl">🧬</div>
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
                  Browse files
                </span>
              </label>
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
