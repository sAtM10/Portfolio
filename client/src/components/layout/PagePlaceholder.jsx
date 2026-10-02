import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Panel } from '@/components/ui/Panel';

import { PageShell } from './PageShell';

/** Centered message page used for 404 and for routes still under construction. */
export function PagePlaceholder({ title, eyebrow, heading, description, actions }) {
  return (
    <PageShell title={title} mainClassName="flex items-center py-16">
      <Container size="narrow">
        <Panel className="animate-rise p-8 sm:p-12">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h1>
          <p className="mt-4 max-w-prose text-fg-muted">{description}</p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </Panel>
      </Container>
    </PageShell>
  );
}
