import { Panel } from '@/components/ui/Panel';
import { TagList } from '@/components/ui/TagList';
import { skillGroups } from '@/data/skills';

export function SkillGroups() {
  return (
    <div className="grid gap-4 @lg:grid-cols-2 @3xl:grid-cols-3">
      {skillGroups.map((group) => (
        <Panel key={group.id} className="p-5">
          <h3 className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">
            {group.title}
          </h3>
          <TagList items={group.skills} label={`${group.title} skills`} className="mt-4" />
        </Panel>
      ))}
    </div>
  );
}
