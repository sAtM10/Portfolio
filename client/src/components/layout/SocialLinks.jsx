import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons';
import { socialLinks } from '@/data/profile';
import { cn } from '@/utils/cn';

const icons = { github: GithubIcon, linkedin: LinkedinIcon };

export function SocialLinks({ className }) {
  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {socialLinks.map(({ id, label, href }) => {
        const Icon = icons[id];
        return (
          <li key={id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className="grid size-9 place-items-center rounded-lg text-fg-muted transition-colors hover:bg-white/[0.05] hover:text-fg"
            >
              <Icon className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
