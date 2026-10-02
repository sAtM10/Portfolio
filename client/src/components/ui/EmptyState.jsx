import { Inbox } from 'lucide-react';

import { Panel } from './Panel';

/** Shown when the API answers successfully but has nothing published for a section. */
export function EmptyState({ title, children }) {
  return (
    <Panel className="flex flex-col items-center px-6 py-12 text-center">
      <Inbox aria-hidden="true" className="size-6 text-fg-subtle" />
      <p className="mt-4 font-medium text-fg">{title}</p>
      {children && <p className="mt-2 max-w-md text-sm text-fg-muted">{children}</p>}
    </Panel>
  );
}
