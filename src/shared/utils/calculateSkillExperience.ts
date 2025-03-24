import { CvProject, SkillMastery } from 'cv-graphql';

function calculateSkillExperience(
  skillName: SkillMastery['name'],
  projects: CvProject[],
): string | null {
  if (!projects) return null;

  const intervals = projects
    .filter((project) => project.environment.includes(skillName))
    .map((project) => [
      new Date(project.start_date),
      project.end_date ? new Date(project.end_date) : new Date(),
    ]);

  if (!intervals.length) return null;

  intervals.sort((a, b) => a[0].getTime() - b[0].getTime());

  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    const lastMerged = merged[merged.length - 1];

    if (lastMerged[1].getTime() >= start.getTime()) {
      lastMerged[1] = new Date(
        Math.max(lastMerged[1].getTime(), end.getTime()),
      );
    } else {
      merged.push([start, end]);
    }
  }

  const totalDays = merged.reduce(
    (sum, [start, end]) =>
      sum + (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    0,
  );
  const totalYears = totalDays / 365.25;

  if (totalYears && Math.floor(totalYears) === 0) return '<1';
  return Math.floor(totalYears).toString();
}

export default calculateSkillExperience;
