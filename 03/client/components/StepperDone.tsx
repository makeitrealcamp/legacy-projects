import { Button, Center, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import axios from 'axios';
import { setImages, setOtherData } from '../slices/userSlice';
import Cookies from 'js-cookie';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconBug } from '@tabler/icons';
import { useRouter } from 'next/router';

export default function StepperDone() {
  const {
    email,
    avatar,
    background,
    mode,
    genre,
    instrument,
    city,
    location,
    skills,
    favoriteGenres,
    price,
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = async () => {
    const token = Cookies.get('sillusr');
    const data = new FormData();
    data.append('email', email as string);
    data.append('avatar', avatar as string | Blob, avatar?.name);
    data.append('background', background as string | Blob, background?.name);
    try {
      const resFormData = await axios.post(
        `${process.env.NEXT_PUBLIC_HEROKU_BACKEND_URI}/api/users/update/form-data`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { email, imagesDone } = resFormData.data.data;
      dispatch(setImages({ email, imagesDone }));
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_HEROKU_BACKEND_URI}/api/users/update`,
        {
          mode,
          city,
          location,
          genre,
          instrument,
          skills,
          favoriteGenres,
          price,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Cookies.remove('mode');
      Cookies.set('mode', res.data.data.mode);
      dispatch(
        setOtherData({
          mode: res.data.data.mode,
          city: res.data.data.city,
          location: res.data.data.location,
          skills: res.data.data.skills,
          favoriteGenres: res.data.data.favoriteGenres,
          price: res.data.data.price,
          genre: res.data.data.genre,
          instrument: res.data.data.instrument,
        })
      );
      showNotification({
        id: 'load-data-user',
        color: 'teal',
        title: res.data.message,
        message:
          'Notification will close in 4 seconds, you can close this notification now.',
        icon: <IconCheck size={16} />,
        autoClose: 4000,
      });
      router.push('/');
    } catch (e) {
      showNotification({
        id: 'load-data-user',
        color: 'red',
        title: 'User could not be updated',
        message:
          'Notification will close in 4 seconds, you can close this notification now',
        icon: <IconBug size={16} />,
        autoClose: 4000,
      });
    }
  };

  return (
    <div>
      <Center>
        <Text
          component='span'
          align='center'
          variant='gradient'
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          size={60}
          weight={700}
          style={{ fontFamily: 'Greycliff CF, sans-serif' }}
        >
          Your done! Click next to continue
        </Text>
      </Center>
      <Center>
        <Button onClick={handleClick}>Next</Button>
      </Center>
    </div>
  );
}
