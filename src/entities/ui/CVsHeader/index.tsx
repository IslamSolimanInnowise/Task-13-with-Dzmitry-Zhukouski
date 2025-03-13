import { StyledCVsHeader, StyledLink } from './cvsHeader.styles';

const CVsHeader: React.FC = () => {
  return (
    <StyledCVsHeader>
      <StyledLink
        to="/cvs/$cvId/details"
        activeProps={{
          style: { color: '#C63031', borderColor: '#C63031' },
        }}
      >
        DETAILS
      </StyledLink>
      <StyledLink
        to="/cvs/$cvId/skills"
        activeProps={{
          style: { color: '#C63031', borderColor: '#C63031' },
        }}
      >
        SKILLS
      </StyledLink>
      <StyledLink
        to="/cvs/$cvId/projects"
        activeProps={{
          style: { color: '#C63031', borderColor: '#C63031' },
        }}
      >
        PROJECTS
      </StyledLink>
      <StyledLink
        to="/cvs/$cvId/preview"
        activeProps={{
          style: { color: '#C63031', borderColor: '#C63031' },
        }}
      >
        PREVIEW
      </StyledLink>
    </StyledCVsHeader>
  );
};
export default CVsHeader;
