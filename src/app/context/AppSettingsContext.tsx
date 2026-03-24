"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "es" | "zh" | "ko" | "hi";
export type FontSize = "sm" | "md" | "lg";

interface AppSettings {
  language: Language;
  fontSize: FontSize;
  highContrast: boolean;
  setLanguage: (lang: Language) => void;
  setFontSize: (size: FontSize) => void;
  setHighContrast: (val: boolean) => void;
}

const AppSettingsContext = createContext<AppSettings | undefined>(undefined);

const fontScaleMap: Record<FontSize, number> = {
  sm: 0.875,
  md: 1,
  lg: 1.25,
};

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [fontSize, setFontSizeState] = useState<FontSize>("md");
  const [highContrast, setHighContrastState] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedLang = localStorage.getItem("kiosk-language") as Language | null;
    const storedSize = localStorage.getItem("kiosk-fontSize") as FontSize | null;
    const storedHC = localStorage.getItem("kiosk-highContrast");
    if (storedLang) setLanguageState(storedLang);
    if (storedSize) setFontSizeState(storedSize);
    if (storedHC) setHighContrastState(storedHC === "true");
  }, []);

  // Sync language to HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem("kiosk-language", language);
  }, [language]);

  // Sync fontSize to CSS custom property
  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(fontScaleMap[fontSize]));
    localStorage.setItem("kiosk-fontSize", fontSize);
  }, [fontSize]);

  // Sync highContrast to data attribute
  useEffect(() => {
    if (highContrast) {
      document.documentElement.setAttribute("data-high-contrast", "true");
    } else {
      document.documentElement.removeAttribute("data-high-contrast");
    }
    localStorage.setItem("kiosk-highContrast", String(highContrast));
  }, [highContrast]);

  return (
    <AppSettingsContext.Provider
      value={{
        language,
        fontSize,
        highContrast,
        setLanguage: setLanguageState,
        setFontSize: setFontSizeState,
        setHighContrast: setHighContrastState,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings(): AppSettings {
  const ctx = useContext(AppSettingsContext);
  if (!ctx) throw new Error("useAppSettings must be used within AppSettingsProvider");
  return ctx;
}
