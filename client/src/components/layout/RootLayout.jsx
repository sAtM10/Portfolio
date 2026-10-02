import { Outlet, ScrollRestoration } from 'react-router';

export default function RootLayout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
      >
        Skip to content
      </a>
      <div className="atmosphere" aria-hidden="true" />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
