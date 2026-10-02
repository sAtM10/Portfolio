import { Award, GraduationCap } from 'lucide-react';

import { Panel } from '@/components/ui/Panel';
import { certifications, education } from '@/data/education';
import { formatDateRange } from '@/utils/date';

export function EducationContent() {
  return (
    <div className="grid gap-4 @2xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      {education.map((item) => (
        <Panel key={item.id} as="article" className="p-6 @lg:p-8">
          <GraduationCap aria-hidden="true" className="size-6 text-accent" />
          <h3 className="mt-4 text-xl font-semibold tracking-tight">{item.degree}</h3>
          <p className="mt-1 text-fg-muted">
            {item.institution} · {item.location}
          </p>
          <p className="mt-4 font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">
            {formatDateRange(item.startDate, item.endDate)} · {item.grade}
          </p>
        </Panel>
      ))}

      <Panel className="p-6 @lg:p-8">
        <h3 className="flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">
          <Award aria-hidden="true" className="size-4 text-accent" />
          Certifications
        </h3>
        <ul className="mt-5 space-y-4">
          {certifications.map((cert) => (
            <li key={cert.title}>
              <p className="text-fg">{cert.title}</p>
              <p className="text-sm text-fg-muted">{cert.issuer}</p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
