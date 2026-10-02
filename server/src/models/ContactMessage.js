import mongoose from 'mongoose';

import { CONTACT_LIMITS, CONTACT_STATUSES, EMAIL_PATTERN } from '../config/constants.js';

const { name, email, subject, message } = CONTACT_LIMITS;

// Privacy: only what the visitor typed is stored — no IP address, user agent,
// cookies or other identifiers.
const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: name.min, maxlength: name.max },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: email.max,
      match: EMAIL_PATTERN,
    },
    subject: { type: String, trim: true, maxlength: subject.max, default: '' },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: message.min,
      maxlength: message.max,
    },
    // Workflow state for the future admin panel.
    status: { type: String, enum: CONTACT_STATUSES, default: 'new' },
  },
  { timestamps: true },
);

contactMessageSchema.index({ status: 1, createdAt: -1 });

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
