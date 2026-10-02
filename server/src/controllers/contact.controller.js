import * as contactService from '../services/contact.service.js';

export async function createContactMessage(req, res) {
  const { website, ...message } = req.validated.body;

  // Honeypot filled in: respond exactly like a success so bots learn nothing,
  // but store nothing.
  if (!website) {
    await contactService.createContactMessage(message);
  }

  res.status(201).json({ data: { received: true } });
}
