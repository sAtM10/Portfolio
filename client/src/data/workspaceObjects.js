// Single map between workspace objects and content sections. Used by the landing
// schematic now, and later by the 3D scene and the plain-portfolio anchors, so
// every object always has a non-3D route to the same information.
export const workspaceObjects = [
  { id: 'laptop', object: 'Laptop', section: 'about', title: 'About' },
  { id: 'monitor', object: 'Monitor', section: 'experience', title: 'Experience' },
  { id: 'rack', object: 'Server rack', section: 'skills', title: 'Tech stack' },
  { id: 'cabinet', object: 'File cabinet', section: 'projects', title: 'Projects' },
  { id: 'terminal', object: 'Terminal', section: 'journey', title: 'Journey' },
  { id: 'phone', object: 'Phone', section: 'contact', title: 'Contact' },
  { id: 'shelf', object: 'Shelf', section: 'interests', title: 'Interests' },
].map((item, index) => ({ ...item, code: String(index + 1).padStart(2, '0') }));
