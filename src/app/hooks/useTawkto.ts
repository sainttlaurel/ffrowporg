import { useEffect } from "react";

/**
 * Dynamically injects the Tawk.to live chat widget script.
 * Only fires when a valid widgetId is provided.
 *
 * @param widgetId - Format: "PROPERTY_ID/WIDGET_ID" from your Tawk.to dashboard.
 *                   Pass an empty string to disable (no-op).
 */
export function useTawkto(widgetId: string) {
  useEffect(() => {
    if (!widgetId || widgetId.trim() === "") return;

    // Avoid injecting twice (e.g. in React StrictMode)
    if (document.getElementById("tawkto-script")) return;

    const script = document.createElement("script");
    script.id = "tawkto-script";
    script.async = true;
    script.src = `https://embed.tawk.to/${widgetId}`;
    script.setAttribute("crossorigin", "*");

    document.head.appendChild(script);

    // Cleanup on unmount — removes the script and the widget iframe Tawk injects
    return () => {
      const el = document.getElementById("tawkto-script");
      el?.remove();
      // Tawk.to injects a fixed div; clean it up too
      document.getElementById("tawkchat-embed-iframe-element")?.remove();
      document.querySelector(".widget-visible")?.remove();
    };
  }, [widgetId]);
}
