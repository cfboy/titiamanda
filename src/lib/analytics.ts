/**
 * Thin wrapper over GA4. The gtag() snippet itself lives in index.html so it is
 * present on every prerendered route before React boots; this module only sends
 * events.
 *
 * Every call is a no-op when it should be: guarded against `window` (entry-server
 * renders these components in Node) and against a missing gtag (an ad blocker,
 * or the dev server, where the remote tag never loads).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type EventParams = Record<string, string | number | boolean | undefined>

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return
  window.gtag?.('event', name, params)
}

/** Every way to reach Amanda, so the report shows which channel parents pick. */
export type ContactMethod = 'whatsapp' | 'phone' | 'email' | 'instagram'

/**
 * A tap on a contact link. `place` says where on the site it happened (the
 * contact section, a service page CTA…) — the same method converts at very
 * different rates depending on where it sits.
 */
export function trackContactClick(method: ContactMethod, place: string): void {
  trackEvent('contact_click', { method, place })
}

/**
 * A completed contact form — the site's actual conversion. `generate_lead` is
 * a GA4 recommended event, so it can be marked as a key event in the UI without
 * registering a custom definition.
 */
export function trackLead(service: string, place: string): void {
  trackEvent('generate_lead', { service: service || 'unspecified', place })
}
