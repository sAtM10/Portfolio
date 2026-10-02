import { ContactMessage } from '../models/ContactMessage.js';

/** Stores a visitor message. Only the submitted fields are persisted (no IP/user agent). */
export async function createContactMessage({ name, email, subject, message }) {
  await ContactMessage.create({ name, email, subject, message });
}
