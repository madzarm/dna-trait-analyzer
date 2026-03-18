import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

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
}

const posts: BlogPost[] = [
  {
    slug: "what-to-do-with-23andme-raw-data",
    title: "What to Do With Your 23andMe Raw Data in 2026",
    date: "March 15, 2026",
    excerpt:
      "You took a 23andMe test, got your ancestry breakdown and health reports — but there's so much more hiding in your raw data. Here's how to unlock it.",
  },
  {
    slug: "promethease-alternative",
    title: "Best Promethease Alternative: AI-Powered DNA Analysis",
    date: "March 10, 2026",
    excerpt:
      "Promethease changed how people explore their genetics, but its fixed-database approach has limitations. Compare it with the next generation of AI-powered DNA analysis.",
  },
  {
    slug: "understanding-mthfr-gene",
    title: "Understanding Your MTHFR Gene Variants: A Complete Guide",
    date: "March 5, 2026",
    excerpt:
      "MTHFR is one of the most talked-about genes in personal genetics. Learn what it does, what common variants mean, and how to check your own status.",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground mt-2">
          Guides and insights on DNA analysis and genetic traits.
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <Card className="transition-colors hover:bg-muted/50">
              <CardContent className="pt-2 space-y-2">
                <p className="text-xs text-muted-foreground">{post.date}</p>
                <h2 className="text-lg font-semibold leading-snug">
                  {post.title}
                </h2>
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
