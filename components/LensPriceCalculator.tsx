"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { frameBasePrice } from "@/lib/configurator-data";
import {
  estimateLensCost,
  lensIndexOptions,
  opticLensBasePrice,
  recommendLensIndex,
} from "@/lib/lens-price-calculator";

export default function LensPriceCalculator() {
  const [diopterInput, setDiopterInput] = useState("2.00");
  const [lensIndexId, setLensIndexId] = useState(lensIndexOptions[0].id);

  const diopter = useMemo(() => {
    const parsed = Number.parseFloat(diopterInput.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : 0;
  }, [diopterInput]);

  const lensIndex = useMemo(
    () => lensIndexOptions.find((option) => option.id === lensIndexId) ?? lensIndexOptions[0],
    [lensIndexId]
  );

  const estimate = useMemo(() => estimateLensCost(diopter, lensIndex), [diopter, lensIndex]);

  const applyRecommendedIndex = () => {
    setLensIndexId(recommendLensIndex(diopter).id);
  };

  return (
    <div className="rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-200 sm:p-8">
      <h2 className="text-xl font-semibold text-gray-900">
        Calculator Estimativ Cost Ochelari
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Introdu puterea lentilei (dioptrii) și alege subțirimea dorită pentru a
        vedea un preț estimativ pentru o pereche de ochelari cu lentile optice.
        Estimarea este orientativă — prețul final se confirmă în urma
        consultației.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <label htmlFor="diopter" className="block text-sm font-medium text-gray-700">
              Puterea lentilei (dioptrii)
            </label>
            <input
              id="diopter"
              type="number"
              inputMode="decimal"
              step={0.25}
              value={diopterInput}
              onChange={(event) => setDiopterInput(event.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
              placeholder="ex: -3.50 sau +2.00"
            />
            <p className="mt-1 text-xs text-gray-500">
              Folosește valori negative pentru miopie și pozitive pentru
              hipermetropie (ex: -3.50, +2.00). {estimate.tier.label}.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="block text-sm font-medium text-gray-700">
                Subțirimea lentilei (index)
              </span>
              <button
                type="button"
                onClick={applyRecommendedIndex}
                className="text-xs font-semibold text-brand-700 hover:text-brand-800"
              >
                Recomandă automat
              </button>
            </div>
            <div className="mt-2 space-y-3">
              {lensIndexOptions.map((option) => {
                const isSelected = option.id === lensIndexId;
                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 bg-white p-4 transition-colors ${
                      isSelected
                        ? "border-brand-700 bg-brand-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="lensIndex"
                      checked={isSelected}
                      onChange={() => setLensIndexId(option.id)}
                      className="mt-1 h-4 w-4 flex-shrink-0 border-gray-300 text-brand-700 focus:ring-brand-700"
                    />
                    <span className="flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {option.name}
                        </span>
                        {option.priceModifier > 0 && (
                          <span className="whitespace-nowrap text-sm font-semibold text-brand-700">
                            +{option.priceModifier} lei
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        {option.description}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Estimare cost
          </h3>

          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-gray-600">Ramă (bază)</dt>
              <dd className="font-medium text-gray-900">{frameBasePrice} lei</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-gray-600">Lentile optice (bază)</dt>
              <dd className="font-medium text-gray-900">{opticLensBasePrice} lei</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-gray-600">Supliment grosime lentilă</dt>
              <dd className="font-medium text-gray-900">
                +{estimate.thicknessSurcharge} lei
              </dd>
            </div>
            {estimate.indexModifier > 0 && (
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Index {lensIndex.index.toFixed(2)}</dt>
                <dd className="font-medium text-gray-900">
                  +{estimate.indexModifier} lei
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
            <span className="text-base font-semibold text-gray-900">
              Total estimativ
            </span>
            <span className="text-2xl font-bold text-brand-700">
              {estimate.totalEstimate.toLocaleString("ro-RO")} lei
            </span>
          </div>

          {estimate.isIndexBelowRecommended && (
            <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
              Pentru {Math.abs(diopter).toFixed(2)} dioptrii recomandăm cel puțin
              indexul {estimate.recommendedIndex.name}, pentru o lentilă suficient
              de subțire și ușoară.
            </p>
          )}

          <Link href="/contact" className="btn-primary mt-6 w-full">
            Programează o consultație
          </Link>
          <p className="mt-3 text-center text-xs text-gray-500">
            Prețul final depinde de rețeta completă (sferă, cilindru, axă) și de
            rama aleasă, stabilite la consultație.
          </p>
        </div>
      </div>
    </div>
  );
}
