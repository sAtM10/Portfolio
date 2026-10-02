import { Section } from '@/components/ui/Section';
import { journey } from '@/data/journey';
import { cn } from '@/utils/cn';

export function JourneySection({ id, code }) {
  return (
    <Section
      id={id}
      code={code}
      title="Developer journey"
      intro="From first lines of code to enterprise delivery."
    >
      <ol className="ml-1.5 border-l border-line-strong">
        {journey.map((step) => (
          <li key={`${step.period}-${step.title}`} className="relative pb-10 pl-8 last:pb-0">
            <span
              aria-hidden="true"
              className={cn(
                'absolute top-1 -left-[6px] size-[11px] rounded-full border-2 border-canvas',
                step.current ? 'bg-accent shadow-[0_0_12px_var(--color-accent)]' : 'bg-fg-subtle',
              )}
            />
            <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
              {step.period}
            </p>
            <h3 className="mt-1.5 font-semibold text-fg">
              {step.title}
              {step.current && <span className="sr-only"> (current)</span>}
            </h3>
            <p className="mt-1 max-w-xl text-fg-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
