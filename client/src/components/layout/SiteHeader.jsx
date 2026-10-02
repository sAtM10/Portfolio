import { Link } from 'react-router';

import { LogoMark } from '@/components/icons/LogoMark';
import { Container } from '@/components/ui/Container';
import { profile } from '@/data/profile';

import { MobileMenu } from './MobileMenu';
import { NavItems } from './NavItems';
import { SocialLinks } from './SocialLinks';

export function SiteHeader() {
  return (
    <header className="relative z-20">
      <Container size="wide" className="flex h-16 items-center justify-between sm:h-20">
        <Link to="/" className="group flex items-center gap-3 rounded-lg">
          <LogoMark className="size-8 transition-transform duration-300 group-hover:-rotate-6" />
          <span className="font-mono text-xs tracking-[0.18em] text-fg-muted uppercase transition-colors group-hover:text-fg">
            {profile.name}
          </span>
          <span className="sr-only"> — home</span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <nav aria-label="Primary">
            <NavItems className="flex items-center gap-1" />
          </nav>
          <span aria-hidden="true" className="h-5 w-px bg-line-strong" />
          <SocialLinks />
        </div>

        <MobileMenu />
      </Container>
    </header>
  );
}
