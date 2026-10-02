import { ArrowRight, FileText } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { profile } from '@/data/profile';
import { trackEvent } from '@/services/analytics';

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="max-w-xl">
      <Eyebrow className="animate-rise">{profile.role}</Eyebrow>

      <h1
        id="hero-title"
        className="mt-6 animate-rise text-5xl leading-[0.95] font-semibold tracking-[-0.035em] [animation-delay:80ms] sm:text-6xl xl:text-7xl"
      >
        <span className="block">{profile.firstName}</span>{' '}
        <span className="block text-fg-muted">{profile.lastName}</span>
      </h1>

      <p className="mt-6 max-w-md animate-rise text-lg text-fg-muted [animation-delay:160ms]">
        {profile.tagline}
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-[1.05em] w-[0.5ch] translate-y-[0.15em] animate-blink bg-accent/80"
        />
      </p>

      <p className="mt-8 inline-flex animate-rise items-center gap-3 rounded-full border border-line bg-white/[0.02] py-1.5 pr-4 pl-3 [animation-delay:240ms]">
        <span
          aria-hidden="true"
          className="size-2 rounded-full bg-success shadow-[0_0_10px_var(--color-success)]"
        />
        <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-fg-subtle uppercase">
          Currently
        </span>
        <span className="text-sm text-fg">{profile.company}</span>
      </p>

      <div className="mt-10 flex animate-rise flex-col gap-3 [animation-delay:320ms] sm:flex-row sm:flex-wrap">
        <Button to="/workspace" size="lg">
          Enter workspace
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5"
          />
        </Button>
        <Button
          href={profile.resumeUrl}
          newTab
          variant="secondary"
          size="lg"
          onClick={() => trackEvent('resume_open', { source: 'landing' })}
        >
          <FileText aria-hidden="true" className="size-4" />
          View resume
        </Button>
      </div>

      <p className="mt-4 flex animate-rise flex-wrap items-center gap-x-1 text-sm text-fg-subtle [animation-delay:400ms]">
        Short on time?
        <Button to="/portfolio" variant="ghost" size="sm">
          Plain portfolio
          <ArrowRight
            aria-hidden="true"
            className="size-3.5 text-accent transition-transform group-hover:translate-x-0.5"
          />
        </Button>
      </p>
    </section>
  );
}
