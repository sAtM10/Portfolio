// Order of the plain-portfolio sections. Ids are the URL anchors used by the
// landing schematic legend (see workspaceObjects.js) — keep them in sync.
export const portfolioSections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Tech stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'education', label: 'Education' },
  { id: 'interests', label: 'Interests' },
  { id: 'contact', label: 'Contact' },
].map((section, index) => ({ ...section, code: String(index + 1).padStart(2, '0') }));
