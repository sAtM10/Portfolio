import { useMemo } from 'react';

import { EmptyState } from '@/components/ui/EmptyState';
import { useProjects } from '@/hooks/usePortfolioContent';
import { cn } from '@/utils/cn';

import { ProjectCard } from './ProjectCard';

const byOrder = (a, b) => a.order - b.order;

function ProjectGroup({ title, note, items, gridClassName }) {
  if (!items.length) return null;

  return (
    <div>
      <div className="mb-6 max-w-2xl">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        {note && <p className="mt-2 text-sm text-fg-muted">{note}</p>}
      </div>
      <ul className={cn('grid gap-4', gridClassName)}>
        {items.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Professional and personal projects from the API (bundled copy until it responds). */
export function ProjectGroups() {
  const { data: projects, source } = useProjects();

  const { professional, personal } = useMemo(() => {
    const sorted = [...projects].sort(byOrder);
    return {
      professional: sorted.filter((project) => project.category === 'professional'),
      personal: sorted.filter((project) => project.category === 'personal'),
    };
  }, [projects]);

  return (
    <div data-source={source}>
      {projects.length === 0 ? (
        <EmptyState title="No projects are published right now">
          Project details are being updated — the resume has a full summary in the meantime.
        </EmptyState>
      ) : (
        <div className="space-y-14">
          <ProjectGroup
            title="Professional work"
            note="Enterprise systems at Generali Central Insurance. Summaries are intentionally high-level — my role, the stack and my contribution."
            items={professional}
            gridClassName="@2xl:grid-cols-2"
          />
          <ProjectGroup
            title="Personal projects"
            items={personal}
            gridClassName="@lg:grid-cols-2 @3xl:grid-cols-3"
          />
        </div>
      )}
    </div>
  );
}
