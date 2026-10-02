import { Section } from '@/components/ui/Section';
import { projects } from '@/data/projects';
import { cn } from '@/utils/cn';

import { ProjectCard } from './ProjectCard';

const byOrder = (a, b) => a.order - b.order;
const professional = projects.filter((p) => p.category === 'professional').sort(byOrder);
const personal = projects.filter((p) => p.category === 'personal').sort(byOrder);

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
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProjectsSection({ id, code }) {
  return (
    <Section id={id} code={code} title="Projects">
      <div className="space-y-14">
        <ProjectGroup
          title="Professional work"
          note="Enterprise systems at Generali Central Insurance. Summaries are intentionally high-level — my role, the stack and my contribution."
          items={professional}
          gridClassName="lg:grid-cols-2"
        />
        <ProjectGroup
          title="Personal projects"
          items={personal}
          gridClassName="sm:grid-cols-2 xl:grid-cols-3"
        />
      </div>
    </Section>
  );
}
