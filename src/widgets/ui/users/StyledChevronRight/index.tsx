import { useNavigate } from '@tanstack/react-router';

import { StyledIcon } from './styledChevronright.styles';

interface IconProps {
  row: {
    original: {
      id: string;
    };
  };
}
const StyledChevronRight: React.FC<IconProps> = ({ row }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({
      to: '/users/$userId',
      params: { userId: row.original.id },
    });
  };

  return <StyledIcon onClick={handleClick} />;
};
export default StyledChevronRight;
