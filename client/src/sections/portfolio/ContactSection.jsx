import { Mail, MapPin } from 'lucide-react';

import { CopyButton } from '@/components/ui/CopyButton';
import { Panel } from '@/components/ui/Panel';
import { Section } from '@/components/ui/Section';
import { profile } from '@/data/profile';

import { ContactForm } from './ContactForm';

function ContactDetail({ icon: Icon, label, children }) {
  return (
    <Panel className="p-5">
      <p className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle uppercase">
        <Icon aria-hidden="true" className="size-3.5" />
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </Panel>
  );
}

// Contact details are deliberately limited to email and location.
export function ContactSection({ id, code }) {
  return (
    <Section
      id={id}
      code={code}
      title="Contact"
      intro="Have a question, an opportunity or just want to say hello? Email me directly or use the form."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
        <div className="space-y-4">
          <ContactDetail icon={Mail} label="Email">
            <div className="flex items-center justify-between gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="min-w-0 text-[0.9375rem] [overflow-wrap:anywhere] text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
              >
                {profile.email}
              </a>
              <CopyButton value={profile.email} label="Copy email address" />
            </div>
          </ContactDetail>
          <ContactDetail icon={MapPin} label="Location">
            <p className="text-fg">{profile.location.label}</p>
            <p className="mt-1 text-sm text-fg-muted">India · IST (UTC+05:30)</p>
          </ContactDetail>
        </div>

        <Panel className="p-6 sm:p-8">
          <ContactForm />
        </Panel>
      </div>
    </Section>
  );
}
