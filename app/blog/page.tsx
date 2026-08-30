import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articole educative despre sănătatea ochilor, alegerea lentilelor și îngrijirea vederii, scrise de echipa Ochelari Cluj.",
};

export default function BlogPage() {
  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Blog Ochelari Cluj
          </p>
          <h1 className="section-heading mt-2">
            Sănătatea ochilor și alegerea lentilelor
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Sfaturi practice și informații verificate de specialiștii noștri,
            pentru a te ajuta să ai grijă de vederea ta.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-200 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl">{post.emoji}</span>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {post.category}
                </span>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-brand-700">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-gray-600">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <span>{formatDate(post.publishedAt)}</span>
                <span aria-hidden="true">•</span>
                <span>{post.readTime} citire</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-brand-700 px-8 py-10 text-center">
          <h2 className="text-2xl font-bold text-white">
            Ai întrebări despre vederea ta?
          </h2>
          <p className="mt-2 text-brand-100">
            Programează o consultație gratuită cu optometriștii noștri din
            Cluj-Napoca.
          </p>
          <Link href="/contact" className="btn-secondary mt-6 inline-flex">
            Programează o consultație
          </Link>
        </div>
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
