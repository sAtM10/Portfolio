// Content sections shared by the plain portfolio (as page sections) and the 3D
// workspace (as object panels). Ids are also the plain-portfolio URL anchors used by
// the landing schematic legend (see workspaceObjects.js) — keep them in sync.
export const portfolioSections = [
  { id: 'about', label: 'About', title: 'About' },
  { id: 'experience', label: 'Experience', title: 'Experience' },
  {
    id: 'skills',
    label: 'Tech stack',
    title: 'Tech stack',
    intro: 'Grouped by area. Items with an amber marker are the stack I use daily at work.',
  },
  { id: 'projects', label: 'Projects', title: 'Projects' },
  {
    id: 'journey',
    label: 'Journey',
    title: 'Developer journey',
    intro: 'From first lines of code to enterprise delivery.',
  },
  { id: 'education', label: 'Education', title: 'Education' },
  {
    id: 'interests',
    label: 'Interests',
    title: 'Interests',
    intro: "What I'm into away from the keyboard.",
  },
  {
    id: 'contact',
    label: 'Contact',
    title: 'Contact',
    intro:
      'Have a question, an opportunity or just want to say hello? Email me directly or use the form.',
  },
].map((section, index) => ({ ...section, code: String(index + 1).padStart(2, '0') }));

export const sectionById = Object.fromEntries(
  portfolioSections.map((section) => [section.id, section]),
);
