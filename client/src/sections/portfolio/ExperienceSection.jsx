import { useMemo } from 'react';

import { EmptyState } from '@/components/ui/EmptyState';
import { Panel } from '@/components/ui/Panel';
import { Section } from '@/components/ui/Section';
import { TagList } from '@/components/ui/TagList';
import { useExperience } from '@/hooks/usePortfolioContent';
import { formatDuration, formatMonthYear } from '@/utils/date';

function ExperienceCard({ job }) {
  return (
    <Panel as="article" className="p-6 sm:p-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">
            {job.role}
            {job.level && <span className="font-normal text-fg-subtle"> · {job.level}</span>}
          </h3>
          <p className="mt-1 text-fg-muted">
            {job.company} · {job.location}
          </p>
        </div>
        <p className="shrink-0 font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase sm:text-right">
          <time dateTime={job.startDate}>{formatMonthYear(job.startDate)}</time>
          {' – '}
          {job.endDate ? (
            <time dateTime={job.endDate}>{formatMonthYear(job.endDate)}</time>
          ) : (
            'Present'
          )}
          <span className="mt-1 block tracking-normal normal-case">
            {formatDuration(job.startDate, job.endDate)}
          </span>
        </p>
      </header>

      <p className="mt-5 text-fg-muted">{job.description}</p>

      <ul className="mt-5 space-y-3">
        {job.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3 text-[0.9375rem] leading-relaxed">
            <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
            {highlight}
          </li>
        ))}
      </ul>

      <TagList items={job.technologies} label="Technologies used" className="mt-6" />
    </Panel>
  );
}

export function ExperienceSection({ id, code }) {
  const { data: experience, source } = useExperience();
  const jobs = useMemo(() => [...experience].sort((a, b) => a.order - b.order), [experience]);

  return (
    <Section id={id} code={code} title="Experience" data-source={source}>
      {jobs.length === 0 ? (
        <EmptyState title="Experience details are being updated">
          The resume has the full work history in the meantime.
        </EmptyState>
      ) : (
        <ol className="space-y-6">
          {jobs.map((job) => (
            <li key={job.slug}>
              <ExperienceCard job={job} />
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
