import { Building2, ExternalLink } from 'lucide-react';

import { GithubIcon } from '@/components/icons/BrandIcons';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { TagList } from '@/components/ui/TagList';
import { trackEvent } from '@/services/analytics';

/** Project summary. Link buttons render only for URLs that actually exist. */
export function ProjectCard({ project }) {
  const { slug, title, category, period, role, description, highlights, technologies } = project;
  const { githubUrl, liveUrl } = project;
  const hasLinks = Boolean(githubUrl || liveUrl);
  const hasFooter = hasLinks || technologies?.length > 0;
  const trackOpen = (link) => trackEvent('project_open', { projectSlug: slug, link });

  return (
    <Panel as="article" className="flex h-full flex-col p-6">
      <header>
        <p className="flex items-center justify-between gap-3 font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle uppercase">
          {category === 'professional' ? (
            <span className="inline-flex items-center gap-1.5">
              <Building2 aria-hidden="true" className="size-3.5" />
              Enterprise · internal
            </span>
          ) : (
            <span>Personal</span>
          )}
          {period && <span>{period}</span>}
        </p>
        <h4 className="mt-3 text-lg font-semibold tracking-tight">{title}</h4>
        {role && <p className="mt-1 text-sm text-accent">{role}</p>}
      </header>

      <p className="mt-3 text-fg-muted">{description}</p>

      {highlights?.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm leading-relaxed">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
              {highlight}
            </li>
          ))}
        </ul>
      )}

      {hasFooter && (
        <div className="mt-auto pt-6">
          <TagList items={technologies} label={`${title} technologies`} />
          {hasLinks && (
            <div className="mt-5 flex flex-wrap gap-2">
              {githubUrl && (
                <Button
                  href={githubUrl}
                  variant="secondary"
                  size="sm"
                  onClick={() => trackOpen('github')}
                >
                  <GithubIcon className="size-3.5" />
                  Code<span className="sr-only"> for {title}</span>
                </Button>
              )}
              {liveUrl && (
                <Button href={liveUrl} size="sm" onClick={() => trackOpen('live')}>
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                  Live demo<span className="sr-only"> of {title}</span>
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </Panel>
  );
}
