const CONSENT_KEY = "site-consent-v1";
const AMBIENT_KEY = "ambient-sound";

export type SiteConsentStatus = "unknown" | "accepted" | "declined";

export function readSiteConsent(): SiteConsentStatus {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    if (value === "accepted" || value === "declined") return value;
    return "unknown";
  } catch {
    return "unknown";
  }
}

export function writeSiteConsent(allowed: boolean) {
  try {
    localStorage.setItem(CONSENT_KEY, allowed ? "accepted" : "declined");
    localStorage.setItem(AMBIENT_KEY, allowed ? "on" : "off");
  } catch {
    // Storage may be blocked in strict/private modes.
  }
}

export function readAmbientPreference(): boolean {
  try {
    return localStorage.getItem(AMBIENT_KEY) !== "off";
  } catch {
    return false;
  }
}
