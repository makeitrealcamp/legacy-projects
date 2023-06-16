import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import {
  IconBrandGoogle,
  IconBrandTwitter,
  IconCheck,
  IconBug,
} from '@tabler/icons';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAppDispatch } from '../hooks/redux';
import { addUserData, setLogged } from '../slices/userSlice';
import Cookies from 'js-cookie';
import { useAuth0 } from '@auth0/auth0-react';

interface LoginProps {
  closeAllModals: (payload_0?: undefined) => void;
}

interface UserValues {
  email: string;
  name: string;
  password: string;
  terms: boolean;
}

const Login = ({ closeAllModals }: LoginProps) => {
  const { loginWithRedirect } = useAuth0();
  const dispatch = useAppDispatch();
  const [type, toggle] = useToggle(['login', 'register']);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email!'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  const handleSubmit = async (values: UserValues) => {
    if (type === 'register') {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_HEROKU_BACKEND_URI}/auth/local/signup`,
          values
        );
        dispatch(
          addUserData({
            name: res.data.data.name,
            email: res.data.data.email,
            imagesDone: res.data.data.imagesDone,
            mode: res.data.data.mode,
          })
        );
        dispatch(setLogged({ isLogged: true }));
        Cookies.remove('auth0');
        Cookies.set('auth0', 'false');
        Cookies.remove('sillusr');
        Cookies.set('sillusr', res.data.data.token, { expires: 1 });
        Cookies.remove('mode');
        Cookies.remove('name');
        Cookies.remove('avatar');
        Cookies.remove('background');
        Cookies.set('mode', res.data.data.mode, { expires: 1 });
        Cookies.set('name', res.data.data.name, { expires: 1 });
        Cookies.set('avatar', res.data.data.imagesDone.avatar, { expires: 1 });
        Cookies.set('background', res.data.data.imagesDone.background, {
          expires: 1,
        });
        showNotification({
          id: 'load-data-user',
          color: 'teal',
          title: 'User was registered successfully',
          message:
            'Notification will close in 4 seconds, you can close this notification now.',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
        router.push('/register-stepper');
      } catch (e) {
        showNotification({
          id: 'load-data-user',
          color: 'red',
          title: 'User could not been registered',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconBug size={16} />,
          autoClose: 4000,
        });
      }
    } else {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_HEROKU_BACKEND_URI}/auth/local/signin`,
          values
        );
        Cookies.remove('auth0');
        Cookies.set('auth0', 'false');
        Cookies.remove('sillusr');
        Cookies.set('sillusr', res.data.data.token, { expires: 1 });
        Cookies.remove('mode');
        Cookies.remove('name');
        Cookies.remove('avatar');
        Cookies.remove('background');
        Cookies.set('mode', res.data.data.mode, { expires: 1 });
        Cookies.set('name', res.data.data.name, { expires: 1 });
        Cookies.set('avatar', res.data.data.imagesDone.avatar, { expires: 1 });
        Cookies.set('background', res.data.data.imagesDone.background, {
          expires: 1,
        });
        dispatch(
          addUserData({
            name: res.data.data.name,
            email: res.data.data.email,
            imagesDone: res.data.data.imagesDone,
            mode: res.data.data.mode,
          })
        );
        showNotification({
          id: 'load-data-user',
          color: 'teal',
          title: 'Login successfully',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
        router.push('/');
        dispatch(setLogged({ isLogged: true }));
      } catch (e) {
        showNotification({
          id: 'load-data-user',
          color: 'red',
          title: 'Login fail',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconBug size={16} />,
          autoClose: 4000,
        });
      }
    }
  };

  return (
    <Paper radius='md' p='xl' withBorder>
      <Text size='lg' weight={500}>
        Welcome to Sillevon, {type} with
      </Text>

      <Group grow mb='md' mt='md'>
        <Button
          onClick={() => {
            loginWithRedirect({ connection: 'google-oauth2' });
            Cookies.set('trigger', 'ok');
          }}
        >
          <IconBrandGoogle size={30} />
          <span>Goolge</span>
        </Button>
        <Button
          onClick={() => {
            loginWithRedirect({ connection: 'twitter' });
            Cookies.set('trigger', 'ok');
          }}
        >
          <IconBrandTwitter size={30} />
          <span>Twitter</span>
        </Button>
      </Group>

      <Divider label='Or continue with email' labelPosition='center' my='lg' />

      <form
        onSubmit={form.onSubmit((values) => {
          closeAllModals();
          handleSubmit(values);
        })}
      >
        <Stack>
          {type === 'register' && (
            <TextInput
              label='Name'
              placeholder='Your name'
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue('name', event.currentTarget.value)
              }
            />
          )}

          <TextInput
            required
            label='Email'
            placeholder='Your email address'
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
          />

          <PasswordInput
            required
            label='Password'
            placeholder='Your password'
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
          />

          {type === 'register' && (
            <Checkbox
              required
              label='I accept terms and conditions'
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue('terms', event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group position='apart' mt='xl'>
          <Anchor
            component='button'
            type='button'
            color='dimmed'
            onClick={() => toggle()}
            size='xs'
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type='submit'>{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
};

export default Login;
