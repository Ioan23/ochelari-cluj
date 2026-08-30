"use client";

import type { ReactNode } from "react";
import { useAccessibility } from "@/lib/accessibility-context";

export default function AccessibilityShell({ children }: { children: ReactNode }) {
  const { highContrast } = useAccessibility();

  return (
    <div
      className="flex min-h-screen flex-1 flex-col"
      data-a11y-contrast={highContrast ? "high" : "normal"}
    >
      {children}
    </div>
  );
}
