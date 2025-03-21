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
} from './professionalSkills.styles';

const skillsData = [
  {
    category: 'Programming languages',
    skills: [
      {
        name: 'JavaScript',
        mastery: 'Expert',
        experienceYears: 1,
        lastUsed: '2021',
      },
      {
        name: 'TypeScript',
        mastery: 'Novice',
        experienceYears: 1,
        lastUsed: '2021',
      },
      {
        name: 'Python',
        mastery: 'Novice',
        experienceYears: null,
        lastUsed: null,
      },
    ],
  },
  {
    category: 'Frontend technologies',
    skills: [
      {
        name: 'React',
        mastery: 'Expert',
        experienceYears: 1,
        lastUsed: '2021',
      },
    ],
  },
];

const ProfessionalSkills: React.FC = () => {
  return (
    <>
      <TopicTitleContainer>
        <TopicTitle>Professional skills</TopicTitle>
      </TopicTitleContainer>
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
                  <StyledTableBodyCategoryCell rowSpan={category.skills.length}>
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
    </>
  );
};

export default ProfessionalSkills;
