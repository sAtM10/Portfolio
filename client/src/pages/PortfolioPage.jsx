import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/ui/Container';
import { portfolioSections } from '@/data/portfolioSections';
import { AboutSection } from '@/sections/portfolio/AboutSection';
import { ContactSection } from '@/sections/portfolio/ContactSection';
import { EducationSection } from '@/sections/portfolio/EducationSection';
import { ExperienceSection } from '@/sections/portfolio/ExperienceSection';
import { InterestsSection } from '@/sections/portfolio/InterestsSection';
import { JourneySection } from '@/sections/portfolio/JourneySection';
import { PortfolioFooter } from '@/sections/portfolio/PortfolioFooter';
import { PortfolioHero } from '@/sections/portfolio/PortfolioHero';
import { ProjectsSection } from '@/sections/portfolio/ProjectsSection';
import { SectionNav } from '@/sections/portfolio/SectionNav';
import { SkillsSection } from '@/sections/portfolio/SkillsSection';

const SECTION_COMPONENTS = {
  about: AboutSection,
  experience: ExperienceSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  journey: JourneySection,
  education: EducationSection,
  interests: InterestsSection,
  contact: ContactSection,
};

/** Traditional, non-3D portfolio: one fast, accessible page for recruiters and mobile. */
export default function PortfolioPage() {
  return (
    <PageShell title="Portfolio — Satwik Mukherjee" footer={<PortfolioFooter />}>
      <PortfolioHero />
      <Container className="lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-14">
        <SectionNav sections={portfolioSections} />
        <div>
          {portfolioSections.map(({ id, code }) => {
            const SectionComponent = SECTION_COMPONENTS[id];
            return <SectionComponent key={id} id={id} code={code} />;
          })}
        </div>
      </Container>
    </PageShell>
  );
}
