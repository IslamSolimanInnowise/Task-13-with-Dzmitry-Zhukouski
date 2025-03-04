interface ProfilePageProps {
  userId: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  return <div>Profile: {userId}</div>;
};
export default ProfilePage;
