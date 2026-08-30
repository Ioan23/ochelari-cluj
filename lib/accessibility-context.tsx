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

export type FontSize = "normal" | "large" | "x-large";

export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: FontSize;
  underlineLinks: boolean;
  reduceMotion: boolean;
}

interface AccessibilityContextValue extends AccessibilitySettings {
  toggleHighContrast: () => void;
  setFontSize: (size: FontSize) => void;
  toggleUnderlineLinks: () => void;
  toggleReduceMotion: () => void;
  resetSettings: () => void;
  isDefault: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  highContrast: false,
  fontSize: "normal",
  underlineLinks: false,
  reduceMotion: false,
};

const STORAGE_KEY = "ochelari-cluj-accessibility";

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(
  undefined
);

function isFontSize(value: unknown): value is FontSize {
  return value === "normal" || value === "large" || value === "x-large";
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<AccessibilitySettings>;
        setSettings({
          highContrast: Boolean(parsed.highContrast),
          fontSize: isFontSize(parsed.fontSize) ? parsed.fontSize : "normal",
          underlineLinks: Boolean(parsed.underlineLinks),
          reduceMotion: Boolean(parsed.reduceMotion),
        });
      }
    } catch {
      // Ignore corrupted or inaccessible storage and start with defaults.
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore storage write failures (e.g. private browsing quota).
    }
  }, [settings, isHydrated]);

  // Font-size and motion/link preferences are set on <html> (not a nested
  // wrapper) because Tailwind's rem-based utilities size relative to the
  // root element's font-size. High contrast is applied via CSS `filter` on a
  // wrapper further down the tree instead, since `filter` on <html> would
  // turn it into the containing block for fixed-position descendants (like
  // the accessibility widget itself), breaking their fixed positioning.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.a11yFontSize = settings.fontSize;
    root.dataset.a11yUnderlineLinks = String(settings.underlineLinks);
    root.dataset.a11yReduceMotion = String(settings.reduceMotion);
  }, [settings.fontSize, settings.underlineLinks, settings.reduceMotion]);

  const toggleHighContrast = useCallback(() => {
    setSettings((current) => ({ ...current, highContrast: !current.highContrast }));
  }, []);

  const setFontSize = useCallback((size: FontSize) => {
    setSettings((current) => ({ ...current, fontSize: size }));
  }, []);

  const toggleUnderlineLinks = useCallback(() => {
    setSettings((current) => ({
      ...current,
      underlineLinks: !current.underlineLinks,
    }));
  }, []);

  const toggleReduceMotion = useCallback(() => {
    setSettings((current) => ({ ...current, reduceMotion: !current.reduceMotion }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  const isDefault = useMemo(
    () =>
      settings.highContrast === DEFAULT_SETTINGS.highContrast &&
      settings.fontSize === DEFAULT_SETTINGS.fontSize &&
      settings.underlineLinks === DEFAULT_SETTINGS.underlineLinks &&
      settings.reduceMotion === DEFAULT_SETTINGS.reduceMotion,
    [settings]
  );

  const value = useMemo(
    () => ({
      ...settings,
      toggleHighContrast,
      setFontSize,
      toggleUnderlineLinks,
      toggleReduceMotion,
      resetSettings,
      isDefault,
    }),
    [
      settings,
      toggleHighContrast,
      setFontSize,
      toggleUnderlineLinks,
      toggleReduceMotion,
      resetSettings,
      isDefault,
    ]
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}
