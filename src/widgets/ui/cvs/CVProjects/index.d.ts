import { CvProject, Project } from 'cv-graphql';

export type TableCV = Pick<
  CvProject,
  | 'id'
  | 'name'
  | 'domain'
  | 'start_date'
  | 'end_date'
  | 'description'
  | 'responsibilities'
> & {
  projectId: Project['id'];
};
