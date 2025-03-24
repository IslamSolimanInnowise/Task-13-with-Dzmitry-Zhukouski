import { Text } from '@chakra-ui/react';
import i18n from '@shared/i18n/config';
import type { LocaleMap } from '@shared/utils/formCvDate';
import { formatCvDate, getFullLocale } from '@shared/utils/formCvDate';
import sortProjectsByEndDate from '@shared/utils/sortProjectsByEndDate';
import { CvProject, Position } from 'cv-graphql';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('cvs');

  return (
    <>
      <TopicTitleContainer>
        <TopicTitle>{t('preview.projects')}</TopicTitle>
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
              <TopicSectionTitle>{t('preview.projectRoles')}</TopicSectionTitle>
              <Text>{role || t('preview.notSpecified')}</Text>
              <TopicSectionTitle>{t('preview.period')}</TopicSectionTitle>
              <Text>
                {formatCvDate(
                  project.start_date,
                  getFullLocale(i18n.language as keyof LocaleMap),
                )}
                {' – '}
                {formatCvDate(
                  project.end_date,
                  getFullLocale(i18n.language as keyof LocaleMap),
                )}
              </Text>
              <TopicSectionTitle>
                {t('preview.responsibilities')}
              </TopicSectionTitle>
              <Text>
                {project.responsibilities?.join(', ') ||
                  t('preview.notSpecified')}
              </Text>
              <TopicSectionTitle>{t('preview.environment')}</TopicSectionTitle>
              <Text>
                {project.environment?.join(', ') || t('preview.notSpecified')}
              </Text>
            </RightTopicSection>
          </TopicContentContainer>
          <TopicsDivider />
        </React.Fragment>
      ))}
    </>
  );
};

export default Projects;
