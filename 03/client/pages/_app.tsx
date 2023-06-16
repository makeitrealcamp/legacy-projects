import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { Auth0Provider } from '@auth0/auth0-react';
import { fetchUserData } from '../lib/userdata';
import Cookies from 'js-cookie';

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const token = Cookies.get('sillusr');
    async function userdata() {
      if (token) {
        const res = await fetchUserData({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = res.data;
        Cookies.remove('mode');
        Cookies.set('mode', user.mode, { expires: 1 });
        Cookies.set('name', user.name, { expires: 1 });
        Cookies.set('avatar', user.imagesDone.avatar, { expires: 1 });
        Cookies.set('background', user.imagesDone.background, { expires: 1 });
      } else {
        Cookies.remove('sillusr');
        Cookies.remove('mode');
        Cookies.remove('name');
        Cookies.remove('avatar');
        Cookies.remove('background');
      }
    }
    userdata();
  }, []);

  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENDID as string;

  return (
    <Provider store={store}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
          >
            <NotificationsProvider>
              <ModalsProvider>
                <Component {...pageProps} />
              </ModalsProvider>
            </NotificationsProvider>
          </Auth0Provider>
        </MantineProvider>
      </ColorSchemeProvider>
    </Provider>
  );
}

export default MyApp;
