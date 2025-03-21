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

const someData = [
  {
    title: 'Some Project name',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, perferendis.',
  },
  {
    title: 'Some Other Project name',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, perferendis.',
  },
  {
    title: 'Another Project name',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, perferendis.',
  },
];

const Projects: React.FC = () => {
  return (
    <>
      <TopicTitleContainer>
        <TopicTitle>Projects</TopicTitle>
      </TopicTitleContainer>
      {someData.map((project, index) => (
        <React.Fragment key={index}>
          <TopicContentContainer>
            <LeftTopicSection>
              <TopicSectionProjectTitle>
                {project.title}
              </TopicSectionProjectTitle>
              <p>{project.description}</p>
            </LeftTopicSection>
            <RightTopicSection>
              <TopicSectionTitle>Project roles</TopicSectionTitle>
              <p>some roles</p>
              <TopicSectionTitle>Period</TopicSectionTitle>
              <p>06.2020 – 06.2021</p>
              <TopicSectionTitle>Responsibilities</TopicSectionTitle>
              <p>resp 1, resp 2, resp 3</p>
              <TopicSectionTitle>Environment</TopicSectionTitle>
              <p>
                HTML5, CSS3, JavaScript, TypeScript, React, React Native, React
                Query, Tailwind, Jest, Storybook, Next.js, Node.js, NestJS,
                Redis, MongoDB, Docker, GitHub Actions.
              </p>
            </RightTopicSection>
          </TopicContentContainer>
          <TopicsDivider />
        </React.Fragment>
      ))}
    </>
  );
};

export default Projects;
