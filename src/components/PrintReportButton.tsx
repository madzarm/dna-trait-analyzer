"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function PrintReportButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => window.print()}
      className="print:hidden"
      data-print-hidden
      aria-label="Print report"
    >
      <Printer className="h-4 w-4" />
    </Button>
  );
}
