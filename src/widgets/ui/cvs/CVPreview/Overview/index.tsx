import { Text } from '@chakra-ui/react';
import { Cv, CvProject, LanguageProficiency, Skill } from 'cv-graphql';
import React from 'react';

import {
  LeftTopicSection,
  RightTopicSection,
  TopicContentContainer,
  TopicsDivider,
  TopicSectionTitle,
} from '../cvpreview.styles';

type OverviewProps = {
  education: Cv['education'];
  languageProficiency: LanguageProficiency[];
  domains: CvProject['domain'][];
  cvName: Cv['name'];
  cvDescription: Cv['description'];
  cvSkills: {
    category: Skill['category_name'];
    skills: Skill['category_name'][];
  }[];
};

const Overview: React.FC<OverviewProps> = ({
  education,
  languageProficiency,
  domains,
  cvName,
  cvDescription,
  cvSkills,
}) => {
  return (
    <>
      <TopicContentContainer>
        <LeftTopicSection>
          <TopicSectionTitle>Education</TopicSectionTitle>
          <Text>{education || 'No education'}</Text>
          <TopicSectionTitle>Language proficiency</TopicSectionTitle>
          {languageProficiency.map((language, index) => (
            <Text key={index}>
              {language.name} &mdash; {language.proficiency}
            </Text>
          ))}
          <TopicSectionTitle>Domains</TopicSectionTitle>
          {domains.map((domain, index) => (
            <Text key={index}>
              {domain}
              {index < domains.length - 1 && ','}
            </Text>
          ))}
        </LeftTopicSection>
        <RightTopicSection>
          <TopicSectionTitle>{cvName}</TopicSectionTitle>
          <Text>{cvDescription}</Text>
          {cvSkills?.map((category, index) => (
            <React.Fragment key={index}>
              <TopicSectionTitle>{category.category}</TopicSectionTitle>
              {category.skills.map((skill, index) => (
                <Text key={index}>{skill}</Text>
              ))}
            </React.Fragment>
          ))}
        </RightTopicSection>
      </TopicContentContainer>
      <TopicsDivider />
    </>
  );
};

export default Overview;
