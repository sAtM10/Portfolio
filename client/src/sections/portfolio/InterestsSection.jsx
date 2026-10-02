import { Clapperboard, Compass, Gamepad2, Headphones, Tv } from 'lucide-react';

import { FootballIcon } from '@/components/icons/FootballIcon';
import { Section } from '@/components/ui/Section';
import { interests } from '@/data/interests';

const ICONS = {
  football: FootballIcon,
  clapperboard: Clapperboard,
  tv: Tv,
  gamepad: Gamepad2,
  headphones: Headphones,
  compass: Compass,
};

export function InterestsSection({ id, code }) {
  return (
    <Section id={id} code={code} title="Interests" intro="What I'm into away from the keyboard.">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {interests.map((interest) => {
          const Icon = ICONS[interest.icon];
          return (
            <li
              key={interest.id}
              className="flex flex-col gap-3 rounded-xl border border-line bg-white/[0.02] p-4"
            >
              <Icon aria-hidden="true" className="size-5 text-accent" />
              <span className="text-sm text-fg">{interest.label}</span>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
