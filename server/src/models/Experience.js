import mongoose from 'mongoose';

import { SLUG_PATTERN } from '../config/constants.js';

const experienceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, match: SLUG_PATTERN },
    company: { type: String, required: true, trim: true, maxlength: 120 },
    role: { type: String, required: true, trim: true, maxlength: 120 },
    level: { type: String, trim: true, maxlength: 60, default: null },
    location: { type: String, trim: true, maxlength: 120, default: null },
    startDate: { type: Date, required: true },
    // null means the role is current ("Present").
    endDate: { type: Date, default: null },
    description: { type: String, trim: true, maxlength: 1000, default: '' },
    highlights: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

experienceSchema.index({ published: 1, order: 1 });

export const Experience = mongoose.model('Experience', experienceSchema);
