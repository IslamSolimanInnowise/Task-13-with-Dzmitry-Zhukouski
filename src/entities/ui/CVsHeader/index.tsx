import { StyledCVsHeader, StyledLink } from './cvsHeader.styles';

const links = [
  { label: 'Details', to: '/cvs/$cvId/details' },
  { label: 'Skills', to: '/cvs/$cvId/skills' },
  { label: 'Projects', to: '/cvs/$cvId/projects' },
  { label: 'Preview', to: '/cvs/$cvId/preview' },
];

const CVsHeader: React.FC = () => {
  return (
    <StyledCVsHeader>
      {links.map(({ label, to }) => (
        <StyledLink
          key={to}
          to={to}
          activeProps={{
            style: { color: '#C63031', borderColor: '#C63031' },
          }}
        >
          {label}
        </StyledLink>
      ))}
    </StyledCVsHeader>
  );
};
export default CVsHeader;
