import { CvProject, SkillMastery } from 'cv-graphql';

function getSkillLastUsedYear(
  skillName: SkillMastery['name'],
  projects: CvProject[],
): string | null {
  const lastUsedProject = projects
    .filter((project) => project.environment.includes(skillName))
    .sort((a, b) => {
      if (!a.end_date && b.end_date) return -1;
      if (a.end_date && !b.end_date) return 1;
      if (a.end_date && b.end_date) {
        return new Date(b.end_date).getTime() - new Date(a.end_date).getTime();
      }
      return 0;
    })
    .at(0);

  if (!lastUsedProject) return null;

  return new Date(lastUsedProject.end_date || new Date())
    .getFullYear()
    .toString();
}

export default getSkillLastUsedYear;
