import mongoose from 'mongoose';

import { PROJECT_CATEGORIES, SLUG_PATTERN } from '../config/constants.js';

const httpsUrl = {
  validator: (value) => value == null || /^https:\/\/\S+$/.test(value),
  message: 'must be an https URL',
};

const maxItems = (limit) => ({
  validator: (items) => items.length <= limit,
  message: `must contain at most ${limit} items`,
});

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, match: SLUG_PATTERN },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    category: { type: String, required: true, enum: PROJECT_CATEGORIES },
    period: { type: String, trim: true, maxlength: 40, default: null },
    role: { type: String, trim: true, maxlength: 80, default: null },
    description: { type: String, required: true, trim: true, maxlength: 600 },
    highlights: { type: [String], default: [], validate: maxItems(8) },
    technologies: { type: [String], default: [], validate: maxItems(20) },
    // Optional links: null means "no link" and the client hides the button.
    githubUrl: { type: String, trim: true, default: null, validate: httpsUrl },
    liveUrl: { type: String, trim: true, default: null, validate: httpsUrl },
    image: { type: String, trim: true, maxlength: 300, default: null },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    // Reserved for the future admin panel: unpublished projects are never served.
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

projectSchema.index({ published: 1, order: 1 });

export const Project = mongoose.model('Project', projectSchema);
