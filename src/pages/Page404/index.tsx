import { Box, Text } from '@chakra-ui/react';
import { authVar } from '@shared/store/globalAuthState';
import { useTranslation } from 'react-i18next';

import { StyledBackButton } from './Page404.styles';

export const Page404 = () => {
  const { t } = useTranslation('page404');
  const { accessToken, id } = authVar();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      pt={4}
    >
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {t('boldText')}
      </Text>
      {accessToken ? (
        <StyledBackButton to={`/users/${id}`}>{t('button')}</StyledBackButton>
      ) : (
        <StyledBackButton to="/auth/login">{t('button')}</StyledBackButton>
      )}
    </Box>
  );
};
