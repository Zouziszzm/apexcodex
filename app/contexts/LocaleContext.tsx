"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { runLocaleBlurSwap } from "@/lib/locale-transition";

export type Locale = "en" | "jp";

interface LocaleContextValue {
  locale: Locale;
  hasSwitched: boolean;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  hasSwitched: false,
  setLocale: () => {},
  toggleLocale: () => {},
});

const localeListeners = new Set<() => void>();

function subscribeLocale(listener: () => void) {
  localeListeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === "locale") listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    localeListeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getLocaleSnapshot(): Locale {
  try {
    return localStorage.getItem("locale") === "jp" ? "jp" : "en";
  } catch {
    return "en";
  }
}

function getServerLocaleSnapshot(): Locale {
  return "en";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );
  const [hasSwitched, setHasSwitched] = useState(false);
  const switchingRef = useRef(false);

  useEffect(() => {
    if (document.documentElement.getAttribute("data-locale") !== locale) {
      document.documentElement.setAttribute("data-locale", locale);
    }
    const targetLang = locale === "jp" ? "ja" : "en";
    if (document.documentElement.lang !== targetLang) {
      document.documentElement.lang = targetLang;
    }
  }, [locale]);

  const applyLocale = useCallback((next: Locale) => {
    setHasSwitched(true);
    try {
      localStorage.setItem("locale", next);
    } catch {
      // ignore
    }
    document.documentElement.setAttribute("data-locale", next);
    document.documentElement.lang = next === "jp" ? "ja" : "en";
    localeListeners.forEach((listener) => listener());
  }, []);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale || switchingRef.current) return;
      runLocaleBlurSwap(() => applyLocale(next), switchingRef);
    },
    [locale, applyLocale],
  );

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "jp" : "en");
  }, [locale, setLocale]);

  return (
    <LocaleContext.Provider
      value={{ locale, hasSwitched, setLocale, toggleLocale }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
