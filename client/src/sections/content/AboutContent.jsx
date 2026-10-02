import { Panel } from '@/components/ui/Panel';
import { education } from '@/data/education';
import { profile } from '@/data/profile';
import { formatDuration, formatMonthYear } from '@/utils/date';

export function AboutContent() {
  const [degree] = education;
  const facts = [
    ['Role', profile.role],
    ['Company', profile.company],
    ['Location', profile.location.label],
    [
      'Experience',
      `Since ${formatMonthYear(profile.since)} · ${formatDuration(profile.since, null)}`,
    ],
    ['Focus', '.NET Core APIs · SQL Server · Angular / React'],
    ['Education', `${degree.shortDegree} · ${degree.shortName}`],
  ];

  return (
    <div className="grid gap-10 @2xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div className="space-y-5 text-[1.0625rem] leading-relaxed text-fg-muted">
        {profile.about.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <Panel as="dl" className="grid gap-4 self-start p-6 text-sm">
        {facts.map(([term, value]) => (
          <div key={term} className="grid gap-1">
            <dt className="font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle uppercase">
              {term}
            </dt>
            <dd className="text-fg">{value}</dd>
          </div>
        ))}
      </Panel>
    </div>
  );
}
