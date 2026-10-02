import { Project } from '../models/Project.js';
import { notFound } from '../utils/HttpError.js';
import { toPublic } from '../utils/serialize.js';

import { findPublishedByIdOrSlug } from './lookup.js';

export async function listProjects({ category, featured } = {}) {
  const filter = {
    published: true,
    ...(category && { category }),
    ...(featured !== undefined && { featured }),
  };
  const projects = await Project.find(filter).sort({ order: 1, _id: 1 }).lean();
  return projects.map(toPublic);
}

export async function getProject(idOrSlug) {
  const project = await findPublishedByIdOrSlug(Project, idOrSlug);
  if (!project) throw notFound('Project');
  return toPublic(project);
}
