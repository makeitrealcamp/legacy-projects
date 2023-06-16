import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Hero from '../components/Hero';
import HomeContent from '../components/HomeContent';
import Layout from '../components/Layout';
import { IconCheck, IconBug } from '@tabler/icons';
import styles from '../styles/Home.module.scss';
import { showNotification } from '@mantine/notifications';

const Home: NextPage = () => {
  const router = useRouter();
  const { redirect_status } = router.query;

  useEffect(() => {
    if (redirect_status) {
      if (redirect_status === 'succeeded') {
        router.push('/profile/client/contracts');
        showNotification({
          id: 'payment succedr',
          color: 'teal',
          title: 'User was registered successfully',
          message:
            'Notification will close in 4 seconds, you can close this notification now.',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
      } else {
        showNotification({
          id: 'payment succedr',
          color: 'red',
          title: 'User could not been registered',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconBug size={16} />,
          autoClose: 4000,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect_status]);
  return (
    <Layout title='Sillevon | Home'>
      <Hero />
      <div className={styles.homePage_content}>
        <HomeContent />
      </div>
    </Layout>
  );
};

export default Home;
