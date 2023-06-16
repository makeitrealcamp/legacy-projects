import Layout from '../../../components/Layout';
import {
  Card,
  TextInput,
  PasswordInput,
  Button,
  Avatar,
  UnstyledButton,
  Text,
  FileInput,
} from '@mantine/core';
import {
  IconLock,
  IconCheck,
  IconBug,
  IconUser,
  IconChevronLeft,
} from '@tabler/icons';
import { useState } from 'react';
import { ConnectionsProps } from '../client/connections';
import { GetServerSideProps } from 'next';
import styles from '../../../styles/SettingsArtists.module.scss';
import { updatedSettings, updatedSettingsRegular } from '../../../lib/userdata';
import Cookies from 'js-cookie';
import { showNotification } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';

type SettingsState = { isDisabled: boolean; value: string; confirm?: string };

interface SettingsProps extends ConnectionsProps {}

export default function Settings({ user }: SettingsProps) {
  const router = useRouter();
  const [name, setName] = useState<SettingsState>({
    isDisabled: true,
    value: user.name,
  });
  const [password, setPassword] = useState<SettingsState>({
    isDisabled: true,
    value: '',
    confirm: '',
  });
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(
    user.imagesDone.avatar
  );
  const [updatedImage, setupdatedImage] = useState<File | null>(null);
  const [visible, { toggle }] = useDisclosure(false);

  const readFile = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        setAvatar(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: any) => {
    readFile(e);
    setupdatedImage(e);
  };

  const token = Cookies.get('sillusr');
  async function handleAvatarSave() {
    const data = new FormData();
    if (updatedImage) {
      data.append('avatar', updatedImage, updatedImage.name);
      try {
        await updatedSettings(data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        showNotification({
          id: 'avatar updated',
          color: 'teal',
          title: 'Avatar was updated successfully',
          message:
            'Notification will close in 4 seconds, you can close this notification now.',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
      } catch {
        showNotification({
          id: 'avatar updated',
          color: 'red',
          title: 'Avatar could not been updated',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconBug size={16} />,
          autoClose: 4000,
        });
      }
    }
  }

  async function updater() {
    try {
      await updatedSettingsRegular(
        { name: name.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showNotification({
        id: 'name updated',
        color: 'teal',
        title: 'Name was updated successfully',
        message:
          'Notification will close in 4 seconds, you can close this notification now.',
        icon: <IconCheck size={16} />,
        autoClose: 4000,
      });
      setName((prev) => ({ ...prev, isDisabled: true }));
    } catch {
      showNotification({
        id: 'name updated',
        color: 'red',
        title: 'Name could not been updated',
        message:
          'Notification will close in 4 seconds, you can close this notification now',
        icon: <IconBug size={16} />,
        autoClose: 4000,
      });
    }
  }

  async function passUpdater() {
    if (password.value === password.confirm) {
      try {
        await updatedSettingsRegular(
          { password: password.value },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        showNotification({
          id: 'Password updated',
          color: 'teal',
          title: 'Password was updated successfully',
          message:
            'Notification will close in 4 seconds, you can close this notification now.',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
        setPassword((prev) => ({ ...prev, isDisabled: true }));
      } catch {
        showNotification({
          id: 'Password updated',
          color: 'red',
          title: 'Password could not been updated',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconBug size={16} />,
          autoClose: 4000,
        });
      }
    } else {
      showNotification({
        id: 'Password updated',
        color: 'red',
        title: 'Passwords have to be equals',
        message:
          'Notification will close in 4 seconds, you can close this notification now',
        icon: <IconBug size={16} />,
        autoClose: 4000,
      });
    }
  }
  return (
    <Layout title={`Sillevon | Settings`}>
      <div className={styles.Container}>
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
          Settings
        </Text>
        <Card shadow='xl' withBorder className={styles.card}>
          <div className={styles.avatarContainer}>
            <Avatar src={avatar as string} alt={user.name} size='xl' />
            {!updatedImage ? (
              <FileInput
                placeholder='Change your avatar'
                onChange={handleChange}
                variant='unstyled'
              />
            ) : (
              <Button variant='subtle' onClick={handleAvatarSave}>
                Save
              </Button>
            )}
          </div>
          <div className={styles.eachinput}>
            <TextInput
              className={styles.input}
              value={name.value}
              icon={<IconUser size={14} />}
              disabled={name.isDisabled}
              onChange={(e) =>
                setName((prev) => ({ ...prev, value: e.target.value }))
              }
            />
            <Button
              variant='subtle'
              onClick={() => {
                if (name.isDisabled) {
                  setName((prev) => ({ ...prev, isDisabled: false }));
                } else {
                  updater();
                }
              }}
            >
              {name.isDisabled ? 'Change name' : 'Save'}
            </Button>
            {!name.isDisabled && (
              <Button
                variant='light'
                color='red'
                radius='lg'
                onClick={() => {
                  setName((prev) => ({ ...prev, isDisabled: true }));
                }}
              >
                Cancel
              </Button>
            )}
          </div>
          <div className={styles.eachinput}>
            {password.isDisabled ? (
              <PasswordInput
                className={styles.input}
                icon={<IconLock size={16} />}
                disabled={password.isDisabled}
                defaultValue='password1234'
              />
            ) : (
              <div className={styles.passwordConfirmation}>
                <PasswordInput
                  label='Password'
                  className={styles.input}
                  visible={visible}
                  value={password.value}
                  onVisibilityChange={toggle}
                  onChange={(e) =>
                    setPassword((prev) => ({
                      ...prev,
                      value: e.target.value,
                    }))
                  }
                />
                <PasswordInput
                  label='Confirm password'
                  className={styles.input}
                  value={password.confirm}
                  visible={visible}
                  onVisibilityChange={toggle}
                  onChange={(e) =>
                    setPassword((prev) => ({
                      ...prev,
                      confirm: e.target.value,
                    }))
                  }
                />
              </div>
            )}
            <Button
              variant='subtle'
              onClick={() => {
                if (password.isDisabled) {
                  setPassword((prev) => ({ ...prev, isDisabled: false }));
                } else {
                  passUpdater();
                }
              }}
            >
              {password.isDisabled ? 'Change password' : 'Save'}
            </Button>
            {!password.isDisabled && (
              <Button
                variant='light'
                color='red'
                radius='lg'
                onClick={() => {
                  setPassword((prev) => ({ ...prev, isDisabled: true }));
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['sillusr'];
  let userData;
  try {
    if (token) {
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
    } else {
      userData = { data: 'Token has expired' };
    }
  } catch (e) {
    console.log(e);
  }
  return {
    props: { user: userData.data },
  };
};
