import Layout from '../../../components/Layout';
import { ContractStats } from '../../../components/ContractStats';
import { GetServerSideProps } from 'next';
import styles from '../../../styles/ArtistStats.module.scss';
import { ConnectionsProps } from '../client/connections';
import { StatsRing } from '../../../components/StatsRing';
import { IconChevronLeft } from '@tabler/icons';
import { Divider, UnstyledButton, Text } from '@mantine/core';
import { useRouter } from 'next/router';

interface StatsProps extends ConnectionsProps {}

export default function Stats({ user }: StatsProps) {
  const router = useRouter();
  const connectionsAmount = user.connections.length;
  const contractsAmount = user.contracts.length;
  const labelThree = user.mode === 'customer' ? 'Balance' : 'Likes';
  const likes = user.posts.reduce((a, b) => a + b.likes, 0);
  const balance = user.contracts.reduce((a, b) => {
    if (b.price) {
      return a + b.price;
    } else {
      return a;
    }
  }, 0);
  const labelThreeStats =
    user.mode === 'customer' ? `$ ${balance.toFixed(2)}` : likes;
  const dataForRings = [
    {
      label: 'Connections',
      stats: connectionsAmount,
      progress: new Date().getDate(),
      color: 'teal',
      icon: 1,
    },
    {
      label: 'Contracts',
      stats: contractsAmount,
      progress: new Date().getDate(),
      color: 'blue',
      icon: 1,
    },
    {
      label: labelThree,
      stats: labelThreeStats,
      progress: new Date().getDate(),
      color: 'violet',
      icon: 1,
    },
  ];

  return (
    <Layout title={`Sillevon | Stats`}>
      <div className={styles.statsContainer}>
        <UnstyledButton mb={20} onClick={() => router.push('/profile/artists')}>
          <IconChevronLeft size={40} />
        </UnstyledButton>
        <Text
          component='span'
          align='center'
          variant='gradient'
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          size={50}
          weight={700}
          style={{ fontFamily: 'Greycliff CF, sans-serif' }}
        >
          Stats
        </Text>
        <ContractStats contracts={user.contracts} />
        <Divider mt={20} mb={20} />
        <StatsRing data={dataForRings} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['sillusr'];
  let userData;
  try {
    const res = await fetch(
      `${process.env.HEROKU_BACKEND_URI}/api/users/datauser`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );
    userData = await res.json();
  } catch (e) {
    userData = { data: 'Token has expired' };
  }
  return {
    props: {
      user: userData.data,
    },
  };
};
