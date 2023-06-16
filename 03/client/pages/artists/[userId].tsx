import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { UserCard } from '../../components/UserCard';
import UserStats from '../../components/UserStats';
import styles from '../../styles/UserIdArtists.module.scss';
import Posts from '../../components/Posts';
import Map from '../../components/Map';
import { Center, Text } from '@mantine/core';
import { useState } from 'react';

export interface ArtistProfileClientProps {
  user: {
    imagesDone: {
      avatar: string;
      background: string;
    };
    location: {
      lat: number;
      lng: number;
    };
    skills: {
      improvisation: number;
      show: number;
      repertoire: number;
      versatility: number;
      instrumentation: number;
    };
    name: string;
    email: string;
    terms: boolean;
    mode: string;
    favoriteGenres: [];
    posts: {
      likes: number;
      _id: string;
      title: string;
      urlImage: string;
      comments: {
        body: string;
        _id: string;
        author: {
          imagesDone: {
            avatar: string;
          };
          name: string;
        };
        post: object;
        createdAt: string;
        updatedAt: string;
      }[];
    }[];
    city: string;
    price: number;
    genre: string;
    instrument: string;
    connections: any[];
    contracts: [];
  };
}

const ArtistProfileClient = ({ user }: ArtistProfileClientProps) => {
  const [connections, setConnections] = useState(user.connections);
  const [contracts, _] = useState(user.contracts);
  const mockData = {
    image: user.imagesDone.background,
    avatar: user.imagesDone.avatar,
    name: user.name,
    job: user.mode,
    stats: [
      {
        value: contracts.length || 0,
        label: 'Contracts',
      },
      {
        value: connections.length || 0,
        label: 'Connections',
      },
      {
        value: user.posts.length || 0,
        label: 'Posts',
      },
    ],
  };

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
          user.skills.improvisation,
          user.skills.versatility,
          user.skills.repertoire,
          user.skills.instrumentation,
          user.skills.show,
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
    <Layout title='Sillevon | ArtistProfileClient'>
      <div className={styles.userArtistsContainer}>
        <div className={styles.userCardInfo}>
          <div className={styles.cardInfo}>
            <UserCard
              setConnections={setConnections}
              instrument={user.instrument}
              email={user.email}
              image={mockData.image}
              avatar={mockData.avatar}
              name={mockData.name}
              job={mockData.job}
              stats={mockData.stats}
            />
          </div>
        </div>
        <div className={styles.allPosts}>
          {user.posts.length > 0 ? (
            user.posts.map((post) => (
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
        <div>
          <div className={styles.userStats}>
            <UserStats data={data} />
            <Map
              zoom={11}
              center={{ lat: 10.96104, lng: -74.800957 }}
              className={styles.userMap}
              position={{ lat: 10.96104, lng: -74.800957 }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArtistProfileClient;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  let user;
  if (params) {
    const res = await fetch(
      `${process.env.HEROKU_BACKEND_URI}/api/users/artist-email/${params.userId}`,
      {
        method: 'GET',
      }
    );
    user = await res.json();
  }
  return {
    props: { user: user.data },
  };
};
