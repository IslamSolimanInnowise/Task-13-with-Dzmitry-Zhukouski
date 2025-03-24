import { Skill, SkillMastery } from 'cv-graphql';
import { useTranslation } from 'react-i18next';

import { TopicTitle, TopicTitleContainer } from '../cvpreview.styles';
import {
  StyledTable,
  StyledTableBody,
  StyledTableBodyCategoryCell,
  StyledTableBodyCell,
  StyledTableBodyRow,
  StyledTableHeader,
  StyledTableHeaderCell,
  StyledTableHeaderRow,
  StyledTableWrapper,
} from './professionalSkills.styles';

type ProfessionalSkillsProps = {
  skillsData: {
    skills: {
      name: Skill['category_name'];
      mastery: SkillMastery['mastery'];
      experienceYears: string | null;
      lastUsed: string | null;
    }[];
    category: Skill['category_name'];
  }[];
};

const ProfessionalSkills: React.FC<ProfessionalSkillsProps> = ({
  skillsData,
}) => {
  const { t } = useTranslation('cvs');

  return (
    <>
      <TopicTitleContainer>
        <TopicTitle>{t('preview.professionalSkills')}</TopicTitle>
      </TopicTitleContainer>
      <StyledTableWrapper>
        <StyledTable>
          <StyledTableHeader>
            <StyledTableHeaderRow>
              <StyledTableHeaderCell colSpan={2}>
                {t('preview.skills')}
              </StyledTableHeaderCell>
              <StyledTableHeaderCell>
                {t('preview.mastery')}
              </StyledTableHeaderCell>
              <StyledTableHeaderCell>
                {t('preview.experienceInYears')}
              </StyledTableHeaderCell>
              <StyledTableHeaderCell>
                {t('preview.lastUsed')}
              </StyledTableHeaderCell>
            </StyledTableHeaderRow>
          </StyledTableHeader>
          <StyledTableBody>
            {skillsData.map((category) =>
              category.skills.map((skill, index) => (
                <StyledTableBodyRow
                  key={`${category.category}-${skill.name}`}
                  $isLast={index === category.skills.length - 1}
                >
                  {index === 0 && (
                    <StyledTableBodyCategoryCell
                      rowSpan={category.skills.length}
                    >
                      {category.category}
                    </StyledTableBodyCategoryCell>
                  )}
                  <StyledTableBodyCell $isLeft={true}>
                    {skill.name}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>{skill.mastery}</StyledTableBodyCell>
                  <StyledTableBodyCell>
                    {skill.experienceYears}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>{skill.lastUsed}</StyledTableBodyCell>
                </StyledTableBodyRow>
              )),
            )}
          </StyledTableBody>
        </StyledTable>
      </StyledTableWrapper>
    </>
  );
};

export default ProfessionalSkills;
