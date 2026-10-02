import { Experience } from '../models/Experience.js';
import { notFound } from '../utils/HttpError.js';
import { toPublic } from '../utils/serialize.js';

import { findPublishedByIdOrSlug } from './lookup.js';

export async function listExperience() {
  const entries = await Experience.find({ published: true }).sort({ order: 1, _id: 1 }).lean();
  return entries.map(toPublic);
}

export async function getExperience(idOrSlug) {
  const entry = await findPublishedByIdOrSlug(Experience, idOrSlug);
  if (!entry) throw notFound('Experience entry');
  return toPublic(entry);
}
