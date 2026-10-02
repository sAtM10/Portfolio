import { RotateCw } from 'lucide-react';
import { isRouteErrorResponse, useRouteError } from 'react-router';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Panel } from '@/components/ui/Panel';

/** Route error boundary. Most likely cause in production: a stale chunk after a redeploy. */
export default function RouteError() {
  const error = useRouteError();
  const detail = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : null;

  return (
    <main className="grid min-h-dvh place-items-center py-16">
      <title>Something went wrong — Satwik Mukherjee</title>
      {/* Rendered in place of RootLayout, so the backdrop is repeated here. */}
      <div className="atmosphere" aria-hidden="true" />
      <Container size="narrow">
        <Panel className="p-8 sm:p-12">
          <Eyebrow>System fault</Eyebrow>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight">Something went wrong</h1>
          <p className="mt-3 text-fg-muted">
            The page failed to load. Reloading usually fixes it — a newer version of the site may
            have been deployed.
          </p>
          {detail && import.meta.env.DEV && (
            <pre className="mt-4 overflow-x-auto rounded-lg bg-black/40 p-3 font-mono text-xs text-danger">
              {detail}
            </pre>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => window.location.reload()}>
              <RotateCw aria-hidden="true" className="size-4" />
              Reload
            </Button>
            <Button href="/" variant="secondary">
              Home
            </Button>
          </div>
        </Panel>
      </Container>
    </main>
  );
}
