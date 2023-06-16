import Layout from '../../../components/Layout';
import ClientLayout from '../../../components/ClientLayout';
import { io, Socket } from 'socket.io-client';
import { GetServerSideProps } from 'next';
import { User } from '../../../components/User';
import Cookies from 'js-cookie';
import { Divider, Text } from '@mantine/core';
import WelcomeChat from '../../../components/WelcomeChat';
import styles from '../../../styles/Chat.module.scss';
import { useEffect, useRef, useState } from 'react';
import ChatView from '../../../components/ChatView';

export interface ChatProps {
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
    connections: {
      _id: string;
      userA: {
        email: string;
        instrument: string;
        name: string;
        imagesDone: {
          avatar: string;
        };
      };
      userB: {
        email: string;
        instrument: string;
        name: string;
        imagesDone: {
          avatar: string;
        };
      };
    }[];
    contracts: {
      contractName: string;
      isAccepted: boolean;
      schedule: Date;
      isPaid: boolean;
      rehearsalSchedule: [];
      price: number;
      _id: string;
      artist: {
        name: string;
        instrument: string;
      };
    }[];
  };
}

export default function Chat({ user }: ChatProps) {
  const socket = useRef<Socket>();
  const [contacts, _] = useState(user.connections);
  const [currentChat, setCurrentChat] = useState<ChatProps | null>(null);
  const [isSelected, setIsSelected] = useState<number | null>(null);

  const mode = Cookies.get('mode');

  const BACKEND_URI = process.env.NEXT_PUBLIC_HEROKU_BACKEND_URI as string;

  useEffect(() => {
    if (typeof user !== 'string') {
      socket.current = io(BACKEND_URI);
      socket.current.emit('add-user', user._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout title={`Sillevon | Chat`}>
      <ClientLayout>
        <div className={styles.chatContainer}>
          <div>
            {isSelected ? (
              <ChatView
                currentChat={currentChat}
                socket={socket}
                userId={user._id}
              />
            ) : (
              <WelcomeChat />
            )}
          </div>
          <Divider orientation='vertical' />
          <div className={styles.contactsContainer}>
            <ul>
              {contacts.length > 0 ? (
                contacts.map((connection, i) => {
                  const user =
                    mode === 'customer' ? connection.userB : connection.userA;
                  return (
                    <li key={connection._id}>
                      <User
                        setCurrentChat={setCurrentChat}
                        index={i}
                        setIsSelected={setIsSelected}
                        user={user}
                      />
                    </li>
                  );
                })
              ) : (
                <Text>There are not connections</Text>
              )}
            </ul>
          </div>
        </div>
      </ClientLayout>
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
    props: {
      user: userData.data,
    },
  };
};
