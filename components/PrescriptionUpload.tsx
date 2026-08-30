"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent, FormEvent } from "react";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.webp,.pdf";
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function PrescriptionUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (candidate: File | undefined | null) => {
    if (!candidate) return;

    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      setError("Format neacceptat. Încarcă o imagine (JPG, PNG, WEBP) sau un PDF.");
      return;
    }

    if (candidate.size > MAX_FILE_SIZE_BYTES) {
      setError(`Fișierul este prea mare. Dimensiunea maximă este de ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }

    setError(null);
    setFile(candidate);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (candidate.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(candidate));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    validateAndSetFile(event.target.files?.[0]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    validateAndSetFile(event.dataTransfer.files?.[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
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

    if (!file) {
      setError("Te rugăm să încarci o fotografie sau un scan al rețetei.");
      return;
    }

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
          Rețeta a fost trimisă cu succes!
        </h2>
        <p className="mt-2 text-gray-600">
          Îți mulțumim! Un consultant optometrist va analiza rețeta și te va
          contacta în cel mai scurt timp pentru a stabili detaliile comenzii.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            handleRemoveFile();
          }}
          className="btn-secondary mt-8"
        >
          Încarcă o altă rețetă
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fotografie sau scan al rețetei
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
          {file ? (
            <div className="w-full">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="Previzualizare rețetă"
                  className="mx-auto max-h-64 rounded-lg object-contain shadow-sm"
                />
              ) : (
                <div className="mx-auto flex h-20 w-16 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              )}
              <p className="mt-4 text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="mt-4 text-sm font-semibold text-red-600 hover:text-red-700"
              >
                Elimină fișierul
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 12v9m0-9l-3 3m3-3l3 3"
                />
              </svg>
              <p className="mt-4 text-sm text-gray-600">
                Trage fișierul aici sau{" "}
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="font-semibold text-brand-700 hover:text-brand-800"
                >
                  alege un fișier
                </button>
              </p>
              <p className="mt-1 text-xs text-gray-500">
                JPG, PNG, WEBP sau PDF, până la {MAX_FILE_SIZE_MB} MB
              </p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_EXTENSIONS}
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Nume complet
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            autoComplete="name"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            placeholder="Numele dvs."
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Telefon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            autoComplete="tel"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            placeholder="07xx xxx xxx"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            placeholder="email@exemplu.ro"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Observații (opțional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            placeholder="Menționează orice detaliu util despre rețetă sau despre rama dorită."
          />
        </div>
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto">
        Trimite Rețeta
      </button>
    </form>
  );
}
