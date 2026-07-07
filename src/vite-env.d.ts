/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FACEBOOK_URL: string;
  readonly VITE_COUNTDOWN_DAYS: string;
  readonly VITE_COUNTDOWN_HOURS: string;
  readonly VITE_WEBINAR_DATE: string;
  readonly VITE_WEBINAR_TIME: string;
  readonly VITE_WEBINAR_PLATFORM: string;
  readonly VITE_API_URL: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_CONTACT_PHONE: string;
  readonly VITE_GA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
