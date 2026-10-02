import { ArrowLeft } from 'lucide-react';

import { PagePlaceholder } from '@/components/layout/PagePlaceholder';
import { Button } from '@/components/ui/Button';
import { useTrackEvent } from '@/hooks/useTrackEvent';

// Placeholder until Phase 6 builds the interactive 3D workspace.
export default function WorkspacePage() {
  useTrackEvent('workspace_enter');

  return (
    <PagePlaceholder
      title="Workspace — Satwik Mukherjee"
      eyebrow="Workspace · offline"
      heading="The workspace is still being assembled"
      description="Soon you'll be able to walk up to the desk and open the laptop, monitor, server rack and more. The plain portfolio has the same information without the 3D."
      actions={
        <>
          <Button to="/portfolio">Plain portfolio</Button>
          <Button to="/" variant="secondary">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to start
          </Button>
        </>
      }
    />
  );
}
