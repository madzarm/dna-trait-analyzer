"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { DEMO_SNPS, DEMO_SNP_COUNT, DEMO_SESSION_PREFIX } from "@/lib/demo-data";
import { storeClientDNA } from "@/lib/client-dna-store";

export function useDemoStart() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);

  const startDemo = useCallback(async () => {
    if (isStarting) return;
    setIsStarting(true);

    try {
      const sessionId = `${DEMO_SESSION_PREFIX}${crypto.randomUUID()}`;

      // Store in client memory for inline SNP fallback
      storeClientDNA(DEMO_SNPS, "23andMe");

      // Create server-side session
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snps: DEMO_SNPS, format: "demo-23andMe" }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/analyze?session=${data.sessionId}&snps=${data.snpCount}&demo=true`);
      } else {
        // Fallback: use client-side session ID directly
        router.push(`/analyze?session=${sessionId}&snps=${DEMO_SNP_COUNT}&demo=true`);
      }
    } finally {
      setIsStarting(false);
    }
  }, [router, isStarting]);

  return { startDemo, isStarting };
}
