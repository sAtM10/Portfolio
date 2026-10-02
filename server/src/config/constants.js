// Shared by Mongoose models and Zod validators so limits are defined once.
// CONTACT_LIMITS must stay in sync with client/src/utils/validateContact.js.

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const OBJECT_ID_PATTERN = /^[a-f0-9]{24}$/i;

// Same rule the client uses, so both sides accept and reject the same addresses.
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const PROJECT_CATEGORIES = ['professional', 'personal'];

export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  subject: { max: 120 },
  message: { min: 10, max: 2000 },
};

export const CONTACT_STATUSES = ['new', 'read', 'archived'];

export const EVENT_TYPES = [
  'portfolio_visit',
  'workspace_enter',
  'project_open',
  'resume_open',
  'contact_submit',
  'plain_mode_open',
];

export const EVENT_LIMITS = {
  metadataKeys: 5,
  metadataKeyPattern: /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/,
  metadataStringMax: 100,
  pathMax: 200,
};

export const EVENT_RETENTION_DAYS = 365;

// Public, cacheable read endpoints (projects, experience) — content changes rarely.
export const PUBLIC_CACHE_CONTROL = 'public, max-age=300';
