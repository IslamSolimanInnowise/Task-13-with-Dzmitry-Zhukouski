import { Text } from '@chakra-ui/react';
import {
  Cv,
  CvProject,
  LanguageProficiency,
  Skill,
  SkillMastery,
} from 'cv-graphql';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
    skills: {
      name: Skill['category_name'];
      mastery: SkillMastery['mastery'];
    }[];
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
  const { t } = useTranslation('cvs');

  return (
    <>
      <TopicContentContainer>
        <LeftTopicSection>
          <TopicSectionTitle>{t('preview.education')}</TopicSectionTitle>
          <Text>{education || t('preview.noEducation')}</Text>
          <TopicSectionTitle>
            {t('preview.languageProficiency')}
          </TopicSectionTitle>
          {languageProficiency?.map((language, index) => (
            <Text key={index}>
              {language.name} &mdash; {language.proficiency}
            </Text>
          ))}
          <TopicSectionTitle>{t('preview.domains')}</TopicSectionTitle>
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
                <Text key={index}>{skill.name}</Text>
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
