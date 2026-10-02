import { Container } from '@/components/ui/Container';
import { profile } from '@/data/profile';
import { cn } from '@/utils/cn';

import { LocalTime } from './LocalTime';

function HudItem({ label, className, children }) {
  return (
    <div className={cn('flex gap-2', className)}>
      <dt className="text-fg-subtle">{label}</dt>
      <dd className="text-fg-muted">{children}</dd>
    </div>
  );
}

/** Footer strip styled like a camera/system HUD readout. */
export function HudBar() {
  const { location, primaryStack } = profile;

  return (
    <footer className="border-t border-line">
      <Container
        size="wide"
        className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-4 font-mono text-[0.6875rem] tracking-[0.14em] uppercase"
      >
        <dl className="flex flex-wrap gap-x-8 gap-y-2">
          <HudItem label="Loc">{location.label}</HudItem>
          <HudItem label="Coord" className="hidden sm:flex">
            {location.coordinates}
          </HudItem>
          <HudItem label="Local">
            <LocalTime timeZone={location.timeZone} label={location.timeZoneLabel} />
          </HudItem>
          <HudItem label="Stack" className="hidden lg:flex">
            {primaryStack.join(' · ')}
          </HudItem>
        </dl>
        <p className="text-fg-subtle">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
