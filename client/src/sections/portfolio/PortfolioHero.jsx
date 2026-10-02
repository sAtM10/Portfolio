import { ArrowRight, CalendarDays, FileText, Mail, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { profile } from '@/data/profile';
import { trackEvent } from '@/services/analytics';
import { formatMonthYear } from '@/utils/date';

function MetaItem({ icon: Icon, children }) {
  return (
    <li className="flex items-center gap-2">
      <Icon aria-hidden="true" className="size-4 text-fg-subtle" />
      {children}
    </li>
  );
}

export function PortfolioHero() {
  return (
    <section aria-labelledby="portfolio-title" className="border-b border-line">
      <Container className="py-14 sm:py-20">
        <Eyebrow className="animate-rise">{profile.role}</Eyebrow>
        <h1
          id="portfolio-title"
          className="mt-5 animate-rise text-4xl font-semibold tracking-[-0.03em] [animation-delay:60ms] sm:text-6xl"
        >
          {profile.name}
        </h1>
        <p className="mt-5 max-w-2xl animate-rise text-lg text-fg-muted [animation-delay:120ms]">
          {profile.headline}
        </p>

        <ul className="mt-8 flex animate-rise flex-wrap gap-x-6 gap-y-3 text-sm text-fg-muted [animation-delay:180ms]">
          <MetaItem icon={MapPin}>{profile.location.label}</MetaItem>
          <MetaItem icon={CalendarDays}>
            At {profile.company} since {formatMonthYear(profile.since)}
          </MetaItem>
          <MetaItem icon={Mail}>
            <a
              href={`mailto:${profile.email}`}
              className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
            >
              {profile.email}
            </a>
          </MetaItem>
        </ul>

        <div className="mt-10 flex animate-rise flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:flex-wrap">
          {profile.resumeUrl && (
            <Button
              href={profile.resumeUrl}
              newTab
              onClick={() => trackEvent('resume_open', { source: 'portfolio' })}
            >
              <FileText aria-hidden="true" className="size-4" />
              View resume
            </Button>
          )}
          <Button href="#contact" variant={profile.resumeUrl ? 'secondary' : 'primary'}>
            <Mail aria-hidden="true" className="size-4" />
            Get in touch
          </Button>
          <Button to="/workspace" variant="ghost">
            Enter workspace
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Button>
        </div>
      </Container>
    </section>
  );
}
