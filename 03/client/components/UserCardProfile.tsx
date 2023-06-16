import { useState } from 'react';
import { Navbar, Group, Avatar, Button, Text } from '@mantine/core';
import {
  IconSettings,
  IconMessageCircle,
  IconUsers,
  IconPhoto,
  IconChartBar,
  IconLogout,
  IconTable,
} from '@tabler/icons';
import { useUserNavProfile } from './ui/useUserNavProfile';
import Cookies from 'js-cookie';
import { openModal, closeAllModals } from '@mantine/modals';
import AddPost from './AddPost';
import { useRouter } from 'next/router';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from '../hooks/redux';

const data = [
  { label: 'Connections', icon: IconUsers },
  { label: 'Stats', icon: IconChartBar },
  { label: 'Contracts', icon: IconTable },
  { label: 'Add a Post', icon: IconPhoto },
  { label: 'Chat', icon: IconMessageCircle },
  { label: 'Settings', icon: IconSettings },
];

interface UserCardProfileProps {
  avatar: string;
  name: string;
  user: {
    _id: string;
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

export function UserCardProfile({}: UserCardProfileProps) {
  const { classes, cx } = useUserNavProfile();
  const [active, setActive] = useState('');
  const router = useRouter();
  const { logout } = useAuth0();
  const { imagesDone, name: username } = useAppSelector((state) => state.user);

  const storedavatar = imagesDone?.avatar || Cookies.get('avatar');
  const storedName = username || Cookies.get('name');
  const auth0 = Cookies.get('auth0');

  const links = data.map((item) => (
    <Button
      variant='outline'
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      key={item.label}
      onClick={() => {
        setActive(item.label);
        if (item.label === 'Add a Post') {
          openModal({
            title: 'Add a post',
            children: <AddPost closeAllModals={closeAllModals} />,
          });
        } else if (item.label === 'Connections') {
          router.push({
            pathname: '/profile/artists/connections',
          });
        } else if (item.label === 'Contracts') {
          router.push({
            pathname: '/profile/artists/contracts',
          });
        } else if (item.label === 'Chat') {
          router.push({
            pathname: '/profile/artists/chat',
          });
        } else if (item.label === 'Stats') {
          router.push({
            pathname: '/profile/artists/stats',
          });
        } else if (item.label === 'Settings') {
          router.push({
            pathname: '/profile/artists/settings',
          });
        }
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Button>
  ));

  return (
    <Navbar height={700} width={{ sm: 300 }} p='md'>
      <Navbar.Section grow>
        <Group className={classes.header} position='apart'>
          <Avatar src={storedavatar} size={37} />
          <Text>{storedName}</Text>
        </Group>
        {links}
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <Button
          variant='outline'
          className={classes.link}
          onClick={() => {
            if (auth0) {
              logout();
            }
            Cookies.remove('auth0');
            Cookies.remove('sillusr');
            Cookies.remove('mode');
            Cookies.remove('name');
            Cookies.remove('avatar');
            Cookies.remove('background');
            window.location.assign('/');
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Button>
      </Navbar.Section>
    </Navbar>
  );
}
