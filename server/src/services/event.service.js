import { SiteEvent } from '../models/SiteEvent.js';

/** Records an anonymous analytics event. Nothing identifying the visitor is stored. */
export async function recordEvent({ eventType, metadata, path }) {
  await SiteEvent.create({ eventType, metadata, path: path ?? null });
}
