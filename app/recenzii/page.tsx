import type { Metadata } from "next";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import { reviews } from "@/lib/reviews-data";

export const metadata: Metadata = {
  title: "Recenzii Clienți",
  description:
    "Descoperă recenziile și testimonialele foto ale clienților Ochelari Cluj și lasă propria recenzie.",
};

const approvedReviews = reviews
  .filter((review) => review.status === "aprobata")
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const totalApproved = approvedReviews.length;
const averageRating =
  totalApproved > 0
    ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / totalApproved
    : 0;

const distribution = [5, 4, 3, 2, 1].map((stars) => {
  const count = approvedReviews.filter((review) => review.rating === stars).length;
  return {
    stars,
    count,
    percent: totalApproved > 0 ? Math.round((count / totalApproved) * 100) : 0,
  };
});

export default function RecenziiPage() {
  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="section-heading">Recenzii Clienți</h1>
          <p className="mt-4 text-lg text-gray-600">
            Peste {totalApproved} de clienți și-au împărtășit experiența,
            unii chiar cu fotografii testimoniale. Citește recenziile lor sau
            lasă-o pe a ta.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200 sm:grid-cols-2">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-5xl font-bold text-brand-700">
              {averageRating.toFixed(1)}
            </p>
            <div className="mt-2 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-xl ${
                    i < Math.round(averageRating) ? "text-gold-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              pe baza a {totalApproved} recenzii
            </p>
          </div>

          <div className="space-y-2">
            {distribution.map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-sm">
                <span className="w-10 text-gray-600">{row.stars} ★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-gold-400"
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
                <span className="w-8 text-right text-gray-500">{row.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {approvedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {approvedReviews.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              Nu există încă recenzii publicate.
            </p>
          )}
        </div>

        <div className="mx-auto mt-20 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Lasă o recenzie
          </h2>
          <p className="mt-2 text-gray-600">
            Spune-ne cum a fost experiența ta și, dacă vrei, adaugă o
            fotografie cu noile tale rame.
          </p>
          <div className="mt-8">
            <ReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
}
