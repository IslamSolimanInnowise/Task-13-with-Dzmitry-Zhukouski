import { useTranslation } from 'react-i18next';

import { StyledCVsHeader, StyledLink } from './cvsHeader.styles';

const CVsHeader: React.FC = () => {
  const { t } = useTranslation('cvs');

  const links = [
    { label: t("header.details"), to: '/cvs/$cvId/details' },
    { label: t('header.skills'), to: '/cvs/$cvId/skills' },
    { label: t('header.projects'), to: '/cvs/$cvId/projects' },
    { label: t('header.preview'), to: '/cvs/$cvId/preview' },
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
