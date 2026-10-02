// Single map between workspace objects and content sections, used by the landing
// schematic, the 3D scene, the object dock and the 2D workspace view. Every object
// opens a panel built from the same content components as the plain portfolio, so
// the 3D scene is never the only way to reach the information.
//
// `also`   extra sections shown under the main one in the panel
// `prompt` decorative shell prompt in the panel header
// `cta`    extra call to action at the end of the panel
export const workspaceObjects = [
  {
    id: 'laptop',
    object: 'Laptop',
    section: 'about',
    title: 'About',
    panelTitle: 'About me',
    also: ['interests'],
  },
  { id: 'monitor', object: 'Monitor', section: 'experience', title: 'Experience' },
  { id: 'rack', object: 'Server rack', section: 'skills', title: 'Tech stack' },
  { id: 'cabinet', object: 'File cabinet', section: 'projects', title: 'Projects' },
  {
    id: 'terminal',
    object: 'Terminal',
    section: 'journey',
    title: 'Journey',
    panelTitle: 'Developer journey',
    prompt: 'cat journey.log',
    also: ['education'],
    cta: 'resume',
  },
  { id: 'phone', object: 'Phone', section: 'contact', title: 'Contact' },
  { id: 'shelf', object: 'Shelf', section: 'interests', title: 'Interests' },
].map((item, index) => ({ ...item, code: String(index + 1).padStart(2, '0') }));

export const workspaceObjectById = Object.fromEntries(
  workspaceObjects.map((item) => [item.id, item]),
);
