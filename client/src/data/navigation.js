import { profile } from './profile';

// `to` = client-side route, `href` = plain link (opened in a new tab),
// `event` = analytics event sent when the link is clicked.
export const primaryNav = [
  { label: 'Workspace', to: '/workspace' },
  { label: 'Portfolio', to: '/portfolio' },
  ...(profile.resumeUrl
    ? [{ label: 'Resume', href: profile.resumeUrl, event: 'resume_open' }]
    : []),
];
