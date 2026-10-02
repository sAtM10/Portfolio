import { profile } from './profile';

// `to` = client-side route, `href` = plain link (opened in a new tab).
export const primaryNav = [
  { label: 'Workspace', to: '/workspace' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Resume', href: profile.resumeUrl },
];
