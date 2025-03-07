import Aside from '@entities/ui/Aside';

interface ProfilePageProps {
  userId: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'grid',
        gridTemplate: '"navigation page" 1fr / max-content 1fr',
      }}
    >
      <Aside />
      <span>Profile: {userId}</span>
    </div>
  );
};
export default ProfilePage;
