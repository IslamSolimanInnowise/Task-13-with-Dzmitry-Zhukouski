import { useTranslation } from 'react-i18next';

import { StyledCVsHeader, StyledLink } from './cvsHeader.styles';

const CVsHeader: React.FC = () => {
  const { t } = useTranslation('CVsHeader');

  const links = [
    { label: t('Details'), to: '/cvs/$cvId/details' },
    { label: t('Skills'), to: '/cvs/$cvId/skills' },
    { label: t('Projects'), to: '/cvs/$cvId/projects' },
    { label: t('Preview'), to: '/cvs/$cvId/preview' },
  ];

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
