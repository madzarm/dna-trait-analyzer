import { Card, CardContent } from "@/components/ui/card";

export default function AnalyzeLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-7 w-48 bg-muted animate-pulse rounded" />
              <div className="h-4 w-64 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-6 w-28 bg-muted animate-pulse rounded-full" />
          </div>

          {/* Trait input skeleton */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 h-9 bg-muted animate-pulse rounded-lg" />
              <div className="h-9 w-24 bg-muted animate-pulse rounded-lg" />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="h-5 w-8 bg-muted animate-pulse rounded" />
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-5 bg-muted animate-pulse rounded-full"
                  style={{ width: `${60 + Math.random() * 40}px` }}
                />
              ))}
            </div>
          </div>

          {/* Results area skeleton */}
          <Card>
            <CardContent className="py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
                <div className="space-y-2 w-full max-w-xs">
                  <div className="h-3 bg-muted animate-pulse rounded mx-auto w-3/4" />
                  <div className="h-3 bg-muted animate-pulse rounded mx-auto w-1/2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
