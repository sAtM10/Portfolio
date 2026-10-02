// Client-side checks for instant feedback. The API validates again (Phase 4) —
// keep these limits in sync with the server's contact schema.
export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  subject: { max: 120 },
  message: { min: 10, max: 2000 },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns { field: message } for every invalid field; empty object when valid. */
export function validateContact(values) {
  const errors = {};
  const name = values.name?.trim() ?? '';
  const email = values.email?.trim() ?? '';
  const subject = values.subject?.trim() ?? '';
  const message = values.message?.trim() ?? '';
  const { name: n, email: e, subject: s, message: m } = CONTACT_LIMITS;

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length < n.min || name.length > n.max)
    errors.name = `Name should be ${n.min}–${n.max} characters.`;

  if (!email) errors.email = 'Please enter your email address.';
  else if (email.length > e.max || !EMAIL_PATTERN.test(email))
    errors.email = 'Please enter a valid email address, e.g. name@company.com.';

  if (subject.length > s.max) errors.subject = `Subject should be at most ${s.max} characters.`;

  if (!message) errors.message = 'Please write a message.';
  else if (message.length < m.min)
    errors.message = `Message should be at least ${m.min} characters.`;
  else if (message.length > m.max)
    errors.message = `Message should be at most ${m.max} characters.`;

  return errors;
}
