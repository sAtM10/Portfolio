import { ArrowLeft } from 'lucide-react';

import { PagePlaceholder } from '@/components/layout/PagePlaceholder';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';

// Placeholder until Phase 3 builds the full plain portfolio.
export default function PortfolioPage() {
  return (
    <PagePlaceholder
      title="Portfolio — Satwik Mukherjee"
      eyebrow="Plain portfolio"
      heading="The traditional portfolio is on its way"
      description="This page will hold a fast, fully accessible single-page portfolio: about, experience, skills, projects, education and contact. Meanwhile, the resume has everything in one place."
      actions={
        <>
          <Button href={profile.resumeUrl} newTab>
            View resume
          </Button>
          <Button to="/" variant="secondary">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to start
          </Button>
        </>
      }
    />
  );
}
