// Configuration constants for Dragons Project

export const FACEBOOK_URL = import.meta.env.VITE_FACEBOOK_URL || "https://www.facebook.com/lexie.lonzkie";
export const COUNTDOWN_DAYS = parseInt(import.meta.env.VITE_COUNTDOWN_DAYS || "14", 10);
export const COUNTDOWN_HOURS = parseInt(import.meta.env.VITE_COUNTDOWN_HOURS || "6", 10);
export const WEBINAR_DATE = import.meta.env.VITE_WEBINAR_DATE || "TBA";
export const WEBINAR_TIME = import.meta.env.VITE_WEBINAR_TIME || "TBA";
export const WEBINAR_PLATFORM = import.meta.env.VITE_WEBINAR_PLATFORM || "Online via Zoom / Facebook Live";
