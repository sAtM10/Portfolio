import { Panel } from '@/components/ui/Panel';
import { Section } from '@/components/ui/Section';
import { TagList } from '@/components/ui/TagList';
import { skillGroups } from '@/data/skills';

export function SkillsSection({ id, code }) {
  return (
    <Section
      id={id}
      code={code}
      title="Tech stack"
      intro="Grouped by area. Items with an amber marker are the stack I use daily at work."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <Panel key={group.id} className="p-5">
            <h3 className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">
              {group.title}
            </h3>
            <TagList items={group.skills} label={`${group.title} skills`} className="mt-4" />
          </Panel>
        ))}
      </div>
    </Section>
  );
}
