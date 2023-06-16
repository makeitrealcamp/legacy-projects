import Layout from '../../../components/Layout';
import styles from '../../../styles/ArtistsProfile.module.scss';
import Posts from '../../../components/Posts';
import UserStats from '../../../components/UserStats';
import Map from '../../../components/Map';
import { UserCardProfile } from '../../../components/UserCardProfile';
import { GetServerSideProps } from 'next';
import { Center, Text } from '@mantine/core';
import { useAppDispatch } from '../../../hooks/redux';
import { setAvatar } from '../../../slices/userSlice';

interface ArtistsProfileProps {
  user: any;
}

export default function ArtistsProfile({ user }: ArtistsProfileProps) {
  const dispatch = useAppDispatch();
  dispatch(setAvatar({ avatar: user.imagesDone.avatar }));
  const data = {
    labels: [
      'Improvisation',
      'Versatility',
      'Repertoire',
      'Instrumentation',
      'Show',
    ],
    datasets: [
      {
        label: 'Skills',
        data: [
          user.skills?.improvisation as number,
          user.skills?.versatility as number,
          user.skills?.repertoire as number,
          user.skills?.instrumentation as number,
          user.skills?.show as number,
        ],
        fill: true,
        backgroundColor: 'rgba(59, 130, 245, 0.2)',
        borderColor: 'rgb(59, 130, 245)',
        pointBackgroundColor: 'rgb(59, 130, 245)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 245)',
      },
    ],
  };
  return (
    <Layout title={`Sillevon | ${user.name}`}>
      <div className={styles.artistsProfileContainer}>
        <div className={styles.userProfileCardInfo}>
          <div className={styles.cardProfileInfo}>
            <UserCardProfile
              user={user}
              avatar={user.imagesDone.avatar}
              name={user.name}
            />
          </div>
        </div>
        <div>
          <Text
            component='span'
            align='center'
            variant='gradient'
            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            size={50}
            weight={700}
            style={{ fontFamily: 'Greycliff CF, sans-serif' }}
          >
            Dashboard
          </Text>
          <div className={styles.allProfilePosts}>
            {user.posts.length > 0 ? (
              user.posts.map((post: any) => (
                <Posts
                  key={post._id}
                  postId={post._id}
                  urlImage={post.urlImage}
                  title={post.title}
                  likesAmount={post.likes}
                  comments={post.comments}
                />
              ))
            ) : (
              <Center>
                <Text>There is not posts</Text>
              </Center>
            )}
          </div>
        </div>
        <div>
          <div className={styles.userProfileStats}>
            <UserStats data={data} />
            <Map
              zoom={11}
              center={user.location}
              className={styles.userProfileMap}
              position={user.location}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['sillusr'];
  let userData;
  if (token) {
    const res = await fetch(
      `${process.env.HEROKU_BACKEND_URI}/api/users/datauser`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    userData = await res.json();
  }
  return {
    props: { user: userData.data },
  };
};
