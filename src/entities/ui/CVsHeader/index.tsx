import i18n from '@shared/i18n/config';

import { StyledCVsHeader, StyledLink } from './cvsHeader.styles';

const links = [
  { label: i18n.t('CVsHeader:Details'), to: '/cvs/$cvId/details' },
  { label: i18n.t('CVsHeader:Skills'), to: '/cvs/$cvId/skills' },
  { label: i18n.t('CVsHeader:Projects'), to: '/cvs/$cvId/projects' },
  { label: i18n.t('CVsHeader:Preview'), to: '/cvs/$cvId/preview' },
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
