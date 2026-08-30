"use client";

import { useMemo, useState } from "react";
import {
  type Review,
  type ReviewStatus,
  reviewStatusLabels,
  reviewStatusStyles,
  reviews as initialReviews,
} from "@/lib/reviews-data";

const statusFilters: Array<ReviewStatus | "toate"> = [
  "toate",
  "in_asteptare",
  "aprobata",
  "respinsa",
];

export default function ReviewsTable() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "toate">(
    "toate"
  );

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesStatus =
        statusFilter === "toate" || review.status === statusFilter;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        review.customerName.toLowerCase().includes(query) ||
        review.id.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [reviews, search, statusFilter]);

  function handleStatusChange(reviewId: string, status: ReviewStatus) {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId ? { ...review, status } : review
      )
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Caută după nume sau nr. recenzie..."
          className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
        />
        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as ReviewStatus | "toate")
          }
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
        >
          {statusFilters.map((status) => (
            <option key={status} value={status}>
              {status === "toate" ? "Toate statusurile" : reviewStatusLabels[status]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Recenzie
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Client
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Punctaj
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Text
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Foto
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Data
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredReviews.map((review) => (
              <tr key={review.id}>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                  {review.id}
                </td>
                <td className="px-4 py-3">
                  <div className="text-gray-900">{review.customerName}</div>
                  <div className="text-xs text-gray-500">{review.email}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="text-gold-400">
                    {"★".repeat(review.rating)}
                  </span>
                  <span className="text-gray-300">
                    {"★".repeat(5 - review.rating)}
                  </span>
                </td>
                <td className="max-w-xs px-4 py-3 text-gray-500">
                  {review.text}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-center text-gray-700">
                  {review.photoEmoji ? (
                    <span title="Are fotografie testimonial">📷</span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                  {review.date}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <select
                    value={review.status}
                    onChange={(event) =>
                      handleStatusChange(
                        review.id,
                        event.target.value as ReviewStatus
                      )
                    }
                    className={`rounded-full border-0 px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-700 ${reviewStatusStyles[review.status]}`}
                  >
                    {Object.entries(reviewStatusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {filteredReviews.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  Nu există recenzii care să corespundă filtrelor selectate.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
