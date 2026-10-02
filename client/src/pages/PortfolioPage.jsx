import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { portfolioSections } from '@/data/portfolioSections';
import { useTrackEvent } from '@/hooks/useTrackEvent';
import { SECTION_CONTENT } from '@/sections/content';
import { PortfolioFooter } from '@/sections/portfolio/PortfolioFooter';
import { PortfolioHero } from '@/sections/portfolio/PortfolioHero';
import { SectionNav } from '@/sections/portfolio/SectionNav';

/** Traditional, non-3D portfolio: one fast, accessible page for recruiters and mobile. */
export default function PortfolioPage() {
  useTrackEvent('plain_mode_open');

  return (
    <PageShell title="Portfolio — Satwik Mukherjee" footer={<PortfolioFooter />}>
      <PortfolioHero />
      <Container className="lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-14">
        <SectionNav sections={portfolioSections} />
        <div>
          {portfolioSections.map(({ id, code, title, intro }) => {
            const Content = SECTION_CONTENT[id];
            return (
              <Section key={id} id={id} code={code} title={title} intro={intro}>
                <Content />
              </Section>
            );
          })}
        </div>
      </Container>
    </PageShell>
  );
}
