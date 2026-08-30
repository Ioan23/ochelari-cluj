"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface SavedPrescription {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  notes?: string;
  fileName: string;
  fileType: "image" | "pdf";
  savedAt: string;
}

interface PrescriptionsContextValue {
  savedPrescriptions: SavedPrescription[];
  savePrescription: (
    prescription: Omit<SavedPrescription, "id" | "savedAt">
  ) => void;
  removePrescription: (id: string) => void;
  totalSaved: number;
}

const PrescriptionsContext = createContext<PrescriptionsContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "ochelari-cluj-saved-prescriptions";

export function PrescriptionsProvider({ children }: { children: ReactNode }) {
  const [savedPrescriptions, setSavedPrescriptions] = useState<SavedPrescription[]>(
    []
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedPrescriptions(JSON.parse(stored));
      }
    } catch {
      // Ignore corrupted or inaccessible storage and start with an empty list.
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPrescriptions));
    } catch {
      // Ignore storage write failures (e.g. private browsing quota).
    }
  }, [savedPrescriptions, isHydrated]);

  const savePrescription = useCallback(
    (prescription: Omit<SavedPrescription, "id" | "savedAt">) => {
      const entry: SavedPrescription = {
        ...prescription,
        id: `RETU-${Date.now().toString(36).toUpperCase()}`,
        savedAt: new Date().toISOString(),
      };
      setSavedPrescriptions((current) => [entry, ...current]);
    },
    []
  );

  const removePrescription = useCallback((id: string) => {
    setSavedPrescriptions((current) => current.filter((item) => item.id !== id));
  }, []);

  const totalSaved = savedPrescriptions.length;

  const value = useMemo(
    () => ({ savedPrescriptions, savePrescription, removePrescription, totalSaved }),
    [savedPrescriptions, savePrescription, removePrescription, totalSaved]
  );

  return (
    <PrescriptionsContext.Provider value={value}>
      {children}
    </PrescriptionsContext.Provider>
  );
}

export function usePrescriptions() {
  const context = useContext(PrescriptionsContext);
  if (!context) {
    throw new Error("usePrescriptions must be used within a PrescriptionsProvider");
  }
  return context;
}
