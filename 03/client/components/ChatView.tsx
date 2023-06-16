import { ActionIcon, Avatar, Card, Divider, Text } from '@mantine/core';
import styles from '../styles/ChatView.module.scss';
import React, {
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { addMessage, allMessage } from '../lib/messages';
import { IconMoodHappy, IconSend, IconKeyboard } from '@tabler/icons';
import Cookies from 'js-cookie';
import { Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

interface ChatViewProps {
  currentChat: any;
  socket: MutableRefObject<Socket | undefined>;
  userId: string;
}

type Messages = {
  _id: string;
  sender: string;
  receiver: string;
  body: string;
}[];

type ArrivalMessage = {
  _id: string;
  sender: string;
  receiver: string;
  body: string;
};

export default function ChatView({
  currentChat,
  socket,
  userId,
}: ChatViewProps) {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [messages, setMessages] = useState<Messages>([]);
  const [arrivalMessage, setArrivalMessage] = useState<ArrivalMessage | null>(
    null
  );
  const dummy = useRef<null | HTMLDivElement>(null);

  const token = Cookies.get('sillusr');

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await allMessage(currentChat._id, {
          headers: {
            Authorization: `Bearer ${token}`,
            cache: 'no-store',
          },
        });
        setMessages(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('message-recieve', (newArrMessage) => {
        setArrivalMessage({
          _id: uuidv4(),
          sender: currentChat._id,
          receiver: userId,
          body: newArrMessage,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [messages]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (message.length > 0) {
      socket.current?.emit('send-message', {
        to: currentChat._id,
        from: userId,
        body: message,
      });
      await addMessage(
        {
          receiver: currentChat._id,
          body: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newMessage = {
        _id: uuidv4(),
        sender: userId,
        receiver: currentChat._id,
        body: message,
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
    }
  }

  function handleEmojiClick(emoji: EmojiClickData) {
    let newMessage = message;
    newMessage += emoji.emoji;
    setMessage(newMessage);
  }

  return (
    <Card shadow='xl' p='lg' radius='md' className={styles.card}>
      <div className={styles.chatViewHeader}>
        <Avatar src={currentChat.imagesDone.avatar} radius='xl' />
        <Text ml={16}>{currentChat.name}</Text>
      </div>
      <Divider mt={20} mb={20} />
      <div className={styles.chatViewContent}>
        {messages.length > 0 &&
          messages.map((message) => {
            const receiver = message.sender === userId;
            return (
              <div
                key={message._id}
                className={
                  !receiver ? styles.messageReciver : styles.messageSender
                }
              >
                <Card shadow='xl' p='lg' radius='md'>
                  <Text>{message.body}</Text>
                </Card>
                <div ref={dummy} />
              </div>
            );
          })}
        {showEmoji && (
          <div className={styles.emojis}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className={styles.messageform}>
        {!showEmoji ? (
          <ActionIcon onClick={() => setShowEmoji((prev) => !prev)}>
            <IconMoodHappy />
          </ActionIcon>
        ) : (
          <ActionIcon onClick={() => setShowEmoji((prev) => !prev)}>
            <IconKeyboard />
          </ActionIcon>
        )}
        <input
          name='message'
          placeholder='Message...'
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>
          <IconSend />
        </button>
      </form>
    </Card>
  );
}
