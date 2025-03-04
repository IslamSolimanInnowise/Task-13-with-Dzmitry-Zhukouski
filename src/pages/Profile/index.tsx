import { useLazyQuery } from '@apollo/client';
import { GET_PROFILE } from '@features/users';
import { useEffect } from 'react';

interface ProfilePageProps {
  userId: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  const [getProfile, { loading }] = useLazyQuery(GET_PROFILE, {
    onCompleted: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    getProfile({ variables: { userId } });
  }, []);

  if (loading) return <div>Loading</div>;

  return <div>Profile: {userId}</div>;
};
export default ProfilePage;
