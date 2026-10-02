import * as eventService from '../services/event.service.js';

export async function recordEvent(req, res) {
  await eventService.recordEvent(req.validated.body);
  res.status(204).end();
}
