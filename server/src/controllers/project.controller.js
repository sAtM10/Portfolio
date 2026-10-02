import { PUBLIC_CACHE_CONTROL } from '../config/constants.js';
import * as projectService from '../services/project.service.js';

export async function listProjects(req, res) {
  const projects = await projectService.listProjects(req.validated.query);
  res.set('Cache-Control', PUBLIC_CACHE_CONTROL).json({ data: projects });
}

export async function getProject(req, res) {
  const project = await projectService.getProject(req.validated.params.id);
  res.set('Cache-Control', PUBLIC_CACHE_CONTROL).json({ data: project });
}
