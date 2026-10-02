import { ArrowLeft } from 'lucide-react';

import { PagePlaceholder } from '@/components/layout/PagePlaceholder';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <PagePlaceholder
      title="Page not found — Satwik Mukherjee"
      eyebrow="Error 404"
      heading="There's no room here"
      description="The page you're looking for doesn't exist or has moved. Head back to the start, or open the plain portfolio."
      actions={
        <>
          <Button to="/">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to start
          </Button>
          <Button to="/portfolio" variant="secondary">
            Plain portfolio
          </Button>
        </>
      }
    />
  );
}
