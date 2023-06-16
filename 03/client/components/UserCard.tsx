import { Card, Avatar, Text, Group, Button } from '@mantine/core';
import { useUserCardStyles } from './ui/useUserCardStyles';
import Cookies from 'js-cookie';
import { makeConnections } from '../lib/connections';
import { IconBug, IconCheck } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import Login from './Login';
import { openModal, closeAllModals } from '@mantine/modals';
import { Dispatch, SetStateAction } from 'react';

interface UserCardProps {
  image: string;
  avatar: string;
  name: string;
  email: string;
  job: string;
  stats: { label: string; value: number }[];
  instrument: string;
  setConnections: Dispatch<SetStateAction<any[]>>;
}

export function UserCard({
  image,
  avatar,
  name,
  job,
  stats,
  email,
  instrument,
  setConnections,
}: UserCardProps) {
  const { classes, theme } = useUserCardStyles();

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text align='center' size='lg' weight={500}>
        {stat.value}
      </Text>
      <Text align='center' size='xs' color='dimmed'>
        {stat.label}
      </Text>
    </div>
  ));

  async function handleClick() {
    const token = Cookies.get('sillusr');
    if (!token) {
      openModal({
        title: 'Stay with us',
        children: <Login closeAllModals={closeAllModals} />,
      });
    } else {
      try {
        const res = await makeConnections(email, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setConnections((prev) => [...prev, res.data]);
        showNotification({
          id: 'load-data-user',
          color: 'teal',
          title: 'Connection successfully',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
      } catch {
        showNotification({
          id: 'load-data-user',
          color: 'red',
          title: 'You could not connect',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconBug size={16} />,
          autoClose: 4000,
        });
      }
    }
  }

  return (
    <Card withBorder p='xl' radius='md' className={classes.card}>
      <Card.Section sx={{ backgroundImage: `url(${image})`, height: 140 }} />
      <Avatar
        src={avatar}
        size={80}
        radius={80}
        mx='auto'
        mt={-30}
        className={classes.avatar}
      />
      <Text align='center' size='lg' weight={500} mt='sm'>
        {name}
      </Text>
      <Text align='center' size='sm' color='dimmed'>
        {job} • {instrument}
      </Text>
      <Group mt='md' position='center' spacing={30}>
        {items}
      </Group>
      <Button
        fullWidth
        radius='md'
        mt='xl'
        size='md'
        color={theme.colorScheme === 'dark' ? undefined : 'dark'}
        onClick={handleClick}
      >
        Connect
      </Button>
    </Card>
  );
}
