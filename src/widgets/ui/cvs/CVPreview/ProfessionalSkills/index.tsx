import { Skill, SkillMastery } from 'cv-graphql';

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
  return (
    <>
      <TopicTitleContainer>
        <TopicTitle>Professional skills</TopicTitle>
      </TopicTitleContainer>
      <StyledTableWrapper>
        <StyledTable>
          <StyledTableHeader>
            <StyledTableHeaderRow>
              <StyledTableHeaderCell colSpan={2}>Skills</StyledTableHeaderCell>
              <StyledTableHeaderCell>Mastery</StyledTableHeaderCell>
              <StyledTableHeaderCell>Experience in years</StyledTableHeaderCell>
              <StyledTableHeaderCell>Last used</StyledTableHeaderCell>
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
