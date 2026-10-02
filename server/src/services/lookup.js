import { OBJECT_ID_PATTERN } from '../config/constants.js';

/**
 * Finds a published document by slug (preferred, human-readable) and falls back to
 * the MongoDB ObjectId when the value looks like one.
 */
export async function findPublishedByIdOrSlug(Model, idOrSlug) {
  const bySlug = await Model.findOne({ slug: idOrSlug, published: true }).lean();
  if (bySlug || !OBJECT_ID_PATTERN.test(idOrSlug)) return bySlug;
  return Model.findOne({ _id: idOrSlug, published: true }).lean();
}
