"use client";

import { Button } from "@/components/ui/button";

export function PrintReportButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.print()}
      className="print:hidden"
      data-print-hidden
    >
      Export PDF
    </Button>
  );
}
