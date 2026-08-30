import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/blog-data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug);

  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            ← Înapoi la blog
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-4xl">{post.emoji}</span>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              {post.category}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <span>{post.author}</span>
            <span aria-hidden="true">•</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden="true">•</span>
            <span>{post.readTime} citire</span>
          </div>

          <div className="mt-10 space-y-6">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-base leading-7 text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Ai nevoie de sfatul unui specialist?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Optometriștii noștri din Cluj-Napoca te ajută să găsești
              soluția potrivită pentru vederea ta.
            </p>
            <Link href="/contact" className="btn-primary mt-4 inline-flex">
              Programează o consultație
            </Link>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mx-auto mt-16 max-w-5xl">
            <h2 className="text-xl font-bold text-gray-900">
              Articole similare
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-200 transition-shadow hover:shadow-md"
                >
                  <span className="text-3xl">{related.emoji}</span>
                  <h3 className="mt-3 text-sm font-semibold text-gray-900 group-hover:text-brand-700">
                    {related.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-500">
                    {related.readTime} citire
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
