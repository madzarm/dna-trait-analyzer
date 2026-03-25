"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dna, FlaskConical } from "lucide-react";
import { useDemoStart } from "@/lib/use-demo-start";

export function MobileStickyBar() {
  const { startDemo, isStarting } = useDemoStart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("upload-section");
    if (!target) return;

    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-border/30 bg-background/95 backdrop-blur-xl px-4 py-3 flex items-center gap-3"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Button
        onClick={() =>
          document
            .getElementById("upload-section")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="flex-1 h-11 rounded-full font-display bg-primary text-primary-foreground cursor-pointer"
      >
        <Dna className="h-4 w-4 mr-2" />
        Analyze My DNA — Free
      </Button>
      <Button
        variant="outline"
        onClick={startDemo}
        disabled={isStarting}
        className="h-11 rounded-full border-primary/30 text-primary cursor-pointer"
      >
        <FlaskConical className="h-4 w-4 mr-1" />
        Live Example
      </Button>
    </div>
  );
}
