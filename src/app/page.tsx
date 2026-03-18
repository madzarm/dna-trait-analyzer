"use client";

import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/components/UploadDropzone";

export default function Home() {
  const router = useRouter();

  const handleUploadComplete = (sessionId: string, snpCount: number) => {
    router.push(`/analyze?session=${sessionId}&snps=${snpCount}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-xl w-full space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">
              DNA Trait Analyzer
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload your MyHeritage raw DNA data and discover what your genes
              say about any trait — powered by AI research.
            </p>
          </div>

          <UploadDropzone onUploadComplete={handleUploadComplete} />

          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Your DNA data is processed securely on the server and never stored
              permanently. Only specific SNP identifiers (not your full genome)
              are used during analysis. Data is automatically deleted after 1
              hour.
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              This tool is for educational purposes only — not medical advice.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
