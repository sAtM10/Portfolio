import { ArrowRight, ArrowUp } from 'lucide-react';

import { LogoMark } from '@/components/icons/LogoMark';
import { SocialLinks } from '@/components/layout/SocialLinks';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { profile } from '@/data/profile';

export function PortfolioFooter() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-3 font-medium">
            <LogoMark className="size-7" />
            {profile.name}
          </p>
          <p className="mt-3 text-sm text-fg-muted">
            {profile.role} · {profile.location.label}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-1 inline-block text-sm text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
          >
            {profile.email}
          </a>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <SocialLinks className="-ml-2 sm:mr-[-0.5rem] sm:ml-0" />
          <div className="-ml-3.5 flex flex-wrap gap-1 sm:mr-[-0.875rem] sm:ml-0">
            <Button href="#main" variant="ghost" size="sm">
              <ArrowUp aria-hidden="true" className="size-3.5" />
              Back to top
            </Button>
            <Button to="/workspace" variant="ghost" size="sm">
              Enter workspace
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Button>
          </div>
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle uppercase">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
