import { PUBLIC_CACHE_CONTROL } from '../config/constants.js';
import * as experienceService from '../services/experience.service.js';

export async function listExperience(_req, res) {
  const entries = await experienceService.listExperience();
  res.set('Cache-Control', PUBLIC_CACHE_CONTROL).json({ data: entries });
}

export async function getExperience(req, res) {
  const entry = await experienceService.getExperience(req.validated.params.id);
  res.set('Cache-Control', PUBLIC_CACHE_CONTROL).json({ data: entry });
}
