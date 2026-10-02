import * as z from 'zod';

import { CONTACT_LIMITS, EMAIL_PATTERN } from '../config/constants.js';

const { name, email, subject, message } = CONTACT_LIMITS;

const text = (requiredMessage) =>
  z.string({
    error: (issue) => (issue.input === undefined ? requiredMessage : 'Must be text.'),
  });

// Messages mirror the client form (client/src/utils/validateContact.js).
export const contactBody = z.object({
  name: text('Please enter your name.')
    .trim()
    .min(1, 'Please enter your name.')
    .min(name.min, `Name should be ${name.min}–${name.max} characters.`)
    .max(name.max, `Name should be ${name.min}–${name.max} characters.`),
  email: text('Please enter your email address.')
    .trim()
    .toLowerCase()
    .min(1, 'Please enter your email address.')
    .max(email.max, 'Please enter a valid email address.')
    .regex(EMAIL_PATTERN, 'Please enter a valid email address.'),
  subject: z
    .string({ error: 'Must be text.' })
    .trim()
    .max(subject.max, `Subject should be at most ${subject.max} characters.`)
    .optional()
    .default(''),
  message: text('Please write a message.')
    .trim()
    .min(1, 'Please write a message.')
    .min(message.min, `Message should be at least ${message.min} characters.`)
    .max(message.max, `Message should be at most ${message.max} characters.`),
  // Honeypot: real visitors never fill this; bots often do.
  website: z.string().optional(),
});
