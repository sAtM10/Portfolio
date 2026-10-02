import { experience } from '@/data/experience';
import { projects } from '@/data/projects';
import { getExperience, getProjects } from '@/services/api';

import { useApiContent } from './useApiContent';

// Bundled snapshots converted to the API's shape (`slug`), shown until — or instead
// of, if the API is unreachable — the live response. They are also the seed source.
const fallbackProjects = projects.map((project) => ({ ...project, slug: project.id }));
const fallbackExperience = experience.map((entry) => ({ ...entry, slug: entry.id }));

export const useProjects = () => useApiContent('projects', getProjects, fallbackProjects);

export const useExperience = () => useApiContent('experience', getExperience, fallbackExperience);
