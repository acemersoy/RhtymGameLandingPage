type EventName =
  | "click_github"
  | "click_docs"
  | "submit_waitlist"
  | "switch_language"
  | "view_section"
  | "open_faq";

type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (name: string, opts?: { props?: EventProps }) => void;
  }
}

export function trackEvent(name: EventName, props?: EventProps) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") window.gtag("event", name, props);
  if (typeof window.plausible === "function")
    window.plausible(name, { props });
  if (process.env.NODE_ENV === "development")
    console.debug("[analytics]", name, props);
}
