import { Text } from '@chakra-ui/react';
import formatCvDate from '@shared/utils/formCvDate';
import sortProjectsByEndDate from '@shared/utils/sortProjectsByEndDate';
import { CvProject, Position } from 'cv-graphql';
import React from 'react';

import {
  LeftTopicSection,
  RightTopicSection,
  TopicContentContainer,
  TopicsDivider,
  TopicSectionProjectTitle,
  TopicSectionTitle,
  TopicTitle,
  TopicTitleContainer,
} from '../cvpreview.styles';

type ProjectsProps = {
  projects: CvProject[];
  role: Position['name'];
};

const Projects: React.FC<ProjectsProps> = ({ projects, role }) => {
  return (
    <>
      <TopicTitleContainer>
        <TopicTitle>Projects</TopicTitle>
      </TopicTitleContainer>
      {sortProjectsByEndDate(projects)?.map((project, index) => (
        <React.Fragment key={index}>
          <TopicContentContainer>
            <LeftTopicSection>
              <TopicSectionProjectTitle>
                {project.name}
              </TopicSectionProjectTitle>
              <Text>{project.description}</Text>
            </LeftTopicSection>
            <RightTopicSection>
              <TopicSectionTitle>Project roles</TopicSectionTitle>
              <Text>{role || 'Not specified'}</Text>
              <TopicSectionTitle>Period</TopicSectionTitle>
              <Text>
                {formatCvDate(project.start_date)}
                {' – '}
                {formatCvDate(project.end_date)}
              </Text>
              <TopicSectionTitle>Responsibilities</TopicSectionTitle>
              <Text>
                {project.responsibilities?.join(', ') || 'Not specified'}
              </Text>
              <TopicSectionTitle>Environment</TopicSectionTitle>
              <Text>{project.environment?.join(', ') || 'Not specified'}</Text>
            </RightTopicSection>
          </TopicContentContainer>
          <TopicsDivider />
        </React.Fragment>
      ))}
    </>
  );
};

export default Projects;
