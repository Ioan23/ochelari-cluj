import type { Review } from "@/lib/reviews-data";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-200">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-lg ${i < review.rating ? "text-gold-400" : "text-gray-300"}`}
            >
              ★
            </span>
          ))}
        </div>
        {review.photoEmoji && (
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl ring-1 ring-gray-200"
            aria-hidden="true"
            title="Testimonial cu fotografie"
          >
            {review.photoEmoji}
          </span>
        )}
      </div>

      <p className="mt-4 flex-1 text-base text-gray-700 italic">
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <p className="text-sm font-semibold text-gray-900">
          {review.customerName}
        </p>
        <p className="text-xs text-gray-500">
          {review.productName ? `A cumpărat: ${review.productName}` : "Client"}
          {" · "}
          {review.date}
        </p>
      </div>
    </div>
  );
}
