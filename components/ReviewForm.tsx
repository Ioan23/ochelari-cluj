"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent, FormEvent } from "react";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.webp";
const MAX_FILE_SIZE_MB = 8;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSetPhoto = (candidate: File | undefined | null) => {
    if (!candidate) return;

    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      setError("Format neacceptat. Încarcă o imagine (JPG, PNG sau WEBP).");
      return;
    }

    if (candidate.size > MAX_FILE_SIZE_BYTES) {
      setError(`Fișierul este prea mare. Dimensiunea maximă este de ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }

    setError(null);
    setPhoto(candidate);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(candidate));
  };

  const handlePhotoInput = (event: ChangeEvent<HTMLInputElement>) => {
    validateAndSetPhoto(event.target.files?.[0]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    validateAndSetPhoto(event.dataTransfer.files?.[0]);
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (rating === 0) {
      setError("Te rugăm să selectezi un punctaj de la 1 la 5 stele.");
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-7 w-7 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-xl font-semibold text-gray-900">
          Îți mulțumim pentru recenzie!
        </h2>
        <p className="mt-2 text-gray-600">
          Recenzia ta a fost trimisă și va apărea pe site după ce este
          verificată de echipa noastră.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setRating(0);
            handleRemovePhoto();
          }}
          className="btn-secondary mt-8"
        >
          Trimite altă recenzie
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Punctaj
        </label>
        <div
          className="mt-2 flex gap-1"
          onMouseLeave={() => setHoverRating(0)}
        >
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1;
            const active = value <= (hoverRating || rating);
            return (
              <button
                key={value}
                type="button"
                onMouseEnter={() => setHoverRating(value)}
                onClick={() => setRating(value)}
                aria-label={`${value} stele`}
                className={`text-3xl transition-colors ${
                  active ? "text-gold-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="reviewName" className="block text-sm font-medium text-gray-700">
            Nume complet
          </label>
          <input
            type="text"
            id="reviewName"
            name="reviewName"
            required
            autoComplete="name"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            placeholder="Numele dvs."
          />
        </div>
        <div>
          <label htmlFor="reviewEmail" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="reviewEmail"
            name="reviewEmail"
            required
            autoComplete="email"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            placeholder="email@exemplu.ro"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="reviewProduct" className="block text-sm font-medium text-gray-700">
            Produs achiziționat (opțional)
          </label>
          <input
            type="text"
            id="reviewProduct"
            name="reviewProduct"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            placeholder="ex: Aviator Classic"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">
            Recenzia ta
          </label>
          <textarea
            id="reviewText"
            name="reviewText"
            required
            rows={4}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            placeholder="Spune-ne despre experiența ta cu produsul și serviciile noastre."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Adaugă o fotografie (opțional)
        </label>
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`mt-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            isDragging
              ? "border-brand-700 bg-brand-50"
              : "border-gray-300 bg-gray-50"
          }`}
        >
          {photo && previewUrl ? (
            <div className="w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Previzualizare fotografie testimonial"
                className="mx-auto max-h-64 rounded-lg object-contain shadow-sm"
              />
              <p className="mt-4 text-sm font-medium text-gray-900">{photo.name}</p>
              <p className="text-sm text-gray-500">{formatFileSize(photo.size)}</p>
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="mt-4 text-sm font-semibold text-red-600 hover:text-red-700"
              >
                Elimină fotografia
              </button>
            </div>
          ) : (
            <>
              <svg
                className="h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-4 text-sm text-gray-600">
                Trage o fotografie aici sau{" "}
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="font-semibold text-brand-700 hover:text-brand-800"
                >
                  alege un fișier
                </button>
              </p>
              <p className="mt-1 text-xs text-gray-500">
                JPG, PNG sau WEBP, până la {MAX_FILE_SIZE_MB} MB
              </p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_EXTENSIONS}
            onChange={handlePhotoInput}
            className="hidden"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" className="btn-primary w-full sm:w-auto">
        Trimite Recenzia
      </button>
    </form>
  );
}
