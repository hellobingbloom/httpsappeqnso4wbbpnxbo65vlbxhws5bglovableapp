import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "@fontsource/instrument-serif/400.css";
import "@fontsource-variable/work-sans";
import App from "./App.tsx";
import "./index.css";

// Google Analytics (GA4) — initialized once at app startup. The SPA's
// RouteAnalytics component reports subsequent route changes as page_view
// events via the shared analytics module (src/lib/analytics.ts).
const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID || "G-VG4FTSTQ19";
if (typeof document !== "undefined" && !document.querySelector(`script[data-bingbloom-ga="${GA_MEASUREMENT_ID}"]`)) {
  const script = document.createElement("script");
  script.async = true;
  script.dataset.bingbloomGa = GA_MEASUREMENT_ID;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
    transport_type: "beacon",
  });
}

// Apply persisted theme before render to avoid flash
try {
  const theme = localStorage.getItem("theme");
  if (theme === "light") document.documentElement.classList.add("light");
  else document.documentElement.classList.remove("light");
} catch {}

const root = document.getElementById("root");
if (!root) throw new Error("Application root is missing");

createRoot(root).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
