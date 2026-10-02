/**
 * Maps a lean MongoDB document to the public API shape: `_id` becomes `id`, and
 * internal fields (`__v`, `published`, timestamps) are never sent to clients.
 */
export function toPublic(doc) {
  if (!doc) return doc;
  const { _id, __v, published, createdAt, updatedAt, ...rest } = doc;
  return { id: String(_id), ...rest };
}
