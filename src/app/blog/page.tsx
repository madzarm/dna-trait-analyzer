import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides, tutorials, and insights on DNA analysis, genetic traits, and getting the most out of your raw genetic data.",
  openGraph: {
    title: "Blog — DNA Trait Analyzer",
    description:
      "Guides, tutorials, and insights on DNA analysis, genetic traits, and getting the most out of your raw genetic data.",
  },
};

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readingTime: string;
}

const posts: BlogPost[] = [
  {
    slug: "what-to-do-with-23andme-raw-data",
    title: "What to Do With Your 23andMe Raw Data in 2026",
    date: "March 15, 2026",
    excerpt:
      "You took a 23andMe test, got your ancestry breakdown and health reports — but there's so much more hiding in your raw data. Here's how to unlock it.",
    category: "Guide",
    readingTime: "6 min read",
  },
  {
    slug: "promethease-alternative",
    title: "Best Promethease Alternative: AI-Powered DNA Analysis",
    date: "March 10, 2026",
    excerpt:
      "Promethease changed how people explore their genetics, but its fixed-database approach has limitations. Compare it with the next generation of AI-powered DNA analysis.",
    category: "Comparison",
    readingTime: "8 min read",
  },
  {
    slug: "understanding-mthfr-gene",
    title: "Understanding Your MTHFR Gene Variants: A Complete Guide",
    date: "March 5, 2026",
    excerpt:
      "MTHFR is one of the most talked-about genes in personal genetics. Learn what it does, what common variants mean, and how to check your own status.",
    category: "Research",
    readingTime: "10 min read",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="space-y-10">
      {/* Header — left-aligned with mono label */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-primary uppercase tracking-wider font-mono">
          Blog
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-display">
          Research &amp; Guides
        </h1>
        <p className="text-muted-foreground mt-1 max-w-lg leading-relaxed">
          Guides and insights on DNA analysis and genetic traits.
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <Card className="transition-all duration-200 border-border/30 card-hover-glow overflow-hidden">
              {/* Accent top bar on hover */}
              <div className="h-0.5 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="pt-5 pb-5 space-y-3">
                <div className="flex items-center gap-3 text-xs">
                  <Badge variant="outline" className="text-[10px] text-primary border-primary/20 font-mono uppercase tracking-wider">
                    {post.category}
                  </Badge>
                  <span className="text-muted-foreground font-mono">{post.date}</span>
                  <span className="text-muted-foreground/40">&middot;</span>
                  <span className="text-muted-foreground font-mono">{post.readingTime}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary/60 transition-colors shrink-0" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
