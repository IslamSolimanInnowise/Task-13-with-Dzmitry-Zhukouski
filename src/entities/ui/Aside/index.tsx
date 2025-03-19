import { Avatar, Text } from '@chakra-ui/react';
import { authVar } from '@shared/store/globalAuthState';
import { MenuItem, MenuRoot, MenuTrigger } from '@shared/ui/menu';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  ChevronRight,
  FileUser,
  Languages,
  TrendingUp,
  Users,
} from 'lucide-react';
import { CircleUserRound, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  StyledAsideContainer,
  StyledAvatarRoot,
  StyledButton,
  StyledChevronIcon,
  StyledEmailText,
  StyledHr,
  StyledIcon,
  StyledLink,
  StyledMenuButton,
  StyledMenuContent,
  StyledNavContainer,
  StyledToggleButton,
  StyledUserContainer,
} from './aside.styles';

const Aside: React.FC = () => {
  const { t } = useTranslation('aside');
  const [isClosed, setIsClosed] = useState(false);
  const { email } = authVar();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();

    await authVar({
      accessToken: null,
      refreshToken: null,
      id: null,
      email: null,
    });

    navigate({ to: '/auth/login' });
  };

  return (
    <StyledAsideContainer $isClosed={isClosed} as="aside">
      <StyledNavContainer as="nav">
        <StyledLink
          to="/users"
          activeProps={{
            style: { background: 'rgba(0, 0, 0, 0.04)' },
          }}
        >
          <StyledIcon as={Users} />
          <Text>{t('employees')}</Text>
        </StyledLink>
        <StyledLink
          to="/skills"
          activeProps={{
            style: { background: 'rgba(0, 0, 0, 0.04)' },
          }}
        >
          <StyledIcon as={TrendingUp} />
          <Text>{t('skills')}</Text>
        </StyledLink>
        <StyledLink
          to="/languages"
          activeProps={{
            style: { background: 'rgba(0, 0, 0, 0.04)' },
          }}
        >
          <StyledIcon as={Languages} />
          <Text>{t('languages')}</Text>
        </StyledLink>
        <StyledLink
          to="/cvs"
          activeProps={{
            style: { background: 'rgba(0, 0, 0, 0.04)' },
          }}
        >
          <StyledIcon as={FileUser} />
          <Text>{t('cvs')}</Text>
        </StyledLink>
      </StyledNavContainer>
      <StyledUserContainer>
        <MenuRoot>
          <MenuTrigger asChild>
            <StyledButton>
              <StyledAvatarRoot>
                <Avatar.Fallback name={email!} />
              </StyledAvatarRoot>
              <StyledEmailText>{email}</StyledEmailText>
            </StyledButton>
          </MenuTrigger>
          <StyledMenuContent>
            <MenuItem asChild value="profile">
              <StyledMenuButton
                as={Link}
                to="/users/$userId"
                params={{ userId: authVar().id! }}
              >
                <CircleUserRound />
                <Text>{t('profile')}</Text>
              </StyledMenuButton>
            </MenuItem>
            <MenuItem asChild value="settings">
              <StyledMenuButton as={Link} to="/settings">
                <Settings />
                <Text>{t('settings')}</Text>
              </StyledMenuButton>
            </MenuItem>
            <StyledHr />
            <MenuItem asChild value="logout">
              <StyledMenuButton as={Link} onClick={handleLogout}>
                <LogOut />
                <Text>{t('logout')}</Text>
              </StyledMenuButton>
            </MenuItem>
          </StyledMenuContent>
        </MenuRoot>
        <StyledToggleButton onClick={() => setIsClosed(!isClosed)}>
          <StyledChevronIcon as={ChevronRight} $isClosed={isClosed} />
        </StyledToggleButton>
      </StyledUserContainer>
    </StyledAsideContainer>
  );
};

export default Aside;
