import mongoose from 'mongoose';

import { EVENT_LIMITS, EVENT_RETENTION_DAYS, EVENT_TYPES } from '../config/constants.js';

// Anonymous, aggregate-only analytics: no IP address, visitor ID, cookie,
// user agent or fingerprint is ever stored.
const siteEventSchema = new mongoose.Schema(
  {
    eventType: { type: String, required: true, enum: EVENT_TYPES },
    // Small, validated key/value pairs, e.g. { projectSlug: "gc-connect" }.
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    // Page pathname only — never a query string or hash.
    path: { type: String, trim: true, maxlength: EVENT_LIMITS.pathMax, default: null },
    timestamp: { type: Date, default: Date.now },
  },
  { minimize: false },
);

// TTL index: MongoDB deletes events automatically once they are older than the
// retention window.
siteEventSchema.index(
  { timestamp: 1 },
  { expireAfterSeconds: EVENT_RETENTION_DAYS * 24 * 60 * 60 },
);
siteEventSchema.index({ eventType: 1, timestamp: -1 });

export const SiteEvent = mongoose.model('SiteEvent', siteEventSchema);
