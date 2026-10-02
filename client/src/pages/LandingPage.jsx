import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/ui/Container';
import { Hero } from '@/sections/landing/Hero';
import { HudBar } from '@/sections/landing/HudBar';
import { WorkspaceSchematic } from '@/sections/landing/WorkspaceSchematic';

export default function LandingPage() {
  return (
    <PageShell
      title="Satwik Mukherjee | Software Development Engineer"
      mainClassName="flex items-center"
      footer={<HudBar />}
    >
      <Container
        size="wide"
        className="grid items-center gap-12 py-10 sm:py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
      >
        <Hero />
        <WorkspaceSchematic />
      </Container>
    </PageShell>
  );
}
