/**
 * Site-wide configuration.
 * Update these values when real details are confirmed.
 */

export const SITE_CONFIG = {
  /** Webinar host full name */
  hostName: "Marlon M. Pilapil",

  /**
   * Webinar date/time (ISO 8601).
   * Set to a future date once confirmed.
   * Example: "2025-09-15T14:00:00+08:00"  (2 PM Philippine Time)
   * Set to null to show "To Be Announced" instead of the countdown.
   */
  webinarDate: null as string | null,

  /** Webinar platform display label */
  platform: "Zoom / Google Meet",

  /**
   * Formspree form endpoint.
   * 1. Go to https://formspree.io and create a free account.
   * 2. Create a new form → copy the endpoint (e.g. "https://formspree.io/f/abcdefgh").
   * 3. Paste it here.
   * Leave as empty string to use the fallback mailto link.
   */
  formspreeEndpoint: "",

  /** WhatsApp number (international format, no + or spaces). Example: "639171234567" */
  whatsappNumber: "",

  /** Facebook page URL */
  facebookUrl: "https://www.facebook.com/lexie.lonzkie",

  /** Instagram profile URL */
  instagramUrl: "#",

  /** YouTube channel URL */
  youtubeUrl: "#",

  /** Messenger link (m.me/username) */
  messengerUrl: "https://m.me/lexie.lonzkie",

  /**
   * YouTube or Facebook video embed URL for the intro video section.
   * YouTube: Use the embed URL format — "https://www.youtube.com/embed/VIDEO_ID"
   * Facebook: Use "https://www.facebook.com/plugins/video.php?href=VIDEO_URL"
   * Set to empty string "" to hide the video section entirely.
   */
  introVideoUrl: "",

  /**
   * Tawk.to live chat widget ID.
   * 1. Go to https://tawk.to and create a free account.
   * 2. Create a new property → copy your Property ID and Widget ID.
   * 3. Paste as "PROPERTY_ID/WIDGET_ID" — e.g. "64abc123def456/1h2i3j4k5"
   * Set to empty string "" to disable the chat widget.
   */
  tawktoWidgetId: "",
};
