import { ArrowLeft, ArrowRight, FileText, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/Button';
import { sectionById } from '@/data/portfolioSections';
import { profile } from '@/data/profile';
import { workspaceObjects } from '@/data/workspaceObjects';
import { SECTION_CONTENT } from '@/sections/content';
import { trackEvent } from '@/services/analytics';

function PanelBody({ object }) {
  const section = sectionById[object.section];
  const Content = SECTION_CONTENT[object.section];

  return (
    <div className="@container">
      {section.intro && <p className="mb-6 text-sm text-fg-muted">{section.intro}</p>}
      <Content />

      {object.also?.map((id) => {
        const Extra = SECTION_CONTENT[id];
        return (
          <div key={id} className="mt-10 border-t border-line pt-8">
            <h3 className="mb-5 font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">
              {sectionById[id].title}
            </h3>
            <Extra />
          </div>
        );
      })}

      {object.cta === 'resume' && (
        <div className="mt-10 border-t border-line pt-8">
          <Button
            href={profile.resumeUrl}
            newTab
            onClick={() => trackEvent('resume_open', { source: 'workspace' })}
          >
            <FileText aria-hidden="true" className="size-4" />
            View resume
          </Button>
        </div>
      )}
    </div>
  );
}

/**
 * Non-modal side panel (bottom sheet on small screens) for one workspace object.
 * Focus moves to its heading when it opens or switches object.
 */
export function WorkspacePanel({ object, onClose, onNavigate }) {
  const headingRef = useRef(null);
  const titleId = `workspace-panel-title`;

  useEffect(() => {
    headingRef.current?.focus();
  }, [object.id]);

  const index = workspaceObjects.findIndex((item) => item.id === object.id);
  const count = workspaceObjects.length;
  const previous = workspaceObjects[(index - 1 + count) % count];
  const next = workspaceObjects[(index + 1) % count];

  return (
    <section
      id="workspace-panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="workspace-panel fixed inset-x-3 bottom-3 z-30 flex max-h-[80dvh] animate-sheet-in flex-col rounded-2xl md:inset-x-auto md:top-4 md:right-4 md:bottom-4 md:max-h-none md:w-[min(32rem,calc(100vw-2rem))] md:animate-panel-in"
    >
      <header className="flex items-start justify-between gap-4 border-b border-line p-5 md:p-6">
        <div className="min-w-0">
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-accent uppercase">
            {object.code} · {object.object}
          </p>
          <h2
            id={titleId}
            ref={headingRef}
            tabIndex={-1}
            className="mt-2 text-2xl font-semibold tracking-tight outline-none"
          >
            {object.panelTitle ?? object.title}
          </h2>
          {object.prompt && (
            <p aria-hidden="true" className="mt-2 truncate font-mono text-xs text-fg-subtle">
              <span className="text-ambient">satwik@workspace</span>:~$ {object.prompt}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid size-9 shrink-0 place-items-center rounded-lg border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
        >
          <X aria-hidden="true" className="size-4" />
          <span className="sr-only">Close panel</span>
        </button>
      </header>

      {/* Keyed so switching objects starts at the top of the new content. */}
      <div key={object.id} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 md:p-6">
        <PanelBody object={object} />
      </div>

      <footer className="flex items-center justify-between gap-2 border-t border-line p-2">
        <Button variant="ghost" size="sm" onClick={() => onNavigate(previous.id)}>
          <ArrowLeft aria-hidden="true" className="size-3.5" />
          <span className="sr-only">Previous: </span>
          {previous.title}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onNavigate(next.id)}>
          <span className="sr-only">Next: </span>
          {next.title}
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Button>
      </footer>
    </section>
  );
}
