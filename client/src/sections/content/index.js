import { AboutContent } from './AboutContent';
import { ContactContent } from './ContactContent';
import { EducationContent } from './EducationContent';
import { ExperienceList } from './ExperienceList';
import { InterestGrid } from './InterestGrid';
import { JourneyTimeline } from './JourneyTimeline';
import { ProjectGroups } from './ProjectGroups';
import { SkillGroups } from './SkillGroups';

// Section id → content component. Layouts use container queries, so each component
// fits both a full-width page section and a narrow workspace panel.
export const SECTION_CONTENT = {
  about: AboutContent,
  experience: ExperienceList,
  skills: SkillGroups,
  projects: ProjectGroups,
  journey: JourneyTimeline,
  education: EducationContent,
  interests: InterestGrid,
  contact: ContactContent,
};
