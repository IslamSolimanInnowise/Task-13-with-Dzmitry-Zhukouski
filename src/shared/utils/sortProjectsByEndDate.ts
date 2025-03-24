import { CvProject } from 'cv-graphql';

const sortProjectsByEndDate = (projects: CvProject[]) => {
  if (!projects) return [];
  return projects.toSorted((a, b) => {
    if (!a.end_date && b.end_date) return -1;
    if (a.end_date && !b.end_date) return 1;
    if (a.end_date && b.end_date) {
      return new Date(b.end_date).getTime() - new Date(a.end_date).getTime();
    }
    return 0;
  });
};

export default sortProjectsByEndDate;
