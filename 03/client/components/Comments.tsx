import { Text, Avatar, Group, TextInput, Button } from '@mantine/core';
import styles from '../styles/Comments.module.scss';
import { useCommentsStyles } from './ui/useCommentsStyles';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { IconCheck, IconBug } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import Login from './Login';
import { openModal } from '@mantine/modals';
import { Dispatch, SetStateAction } from 'react';

interface CommentsProps {
  closeAllModals: (payload_0?: undefined) => void;
  setComment: Dispatch<
    SetStateAction<
      {
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
      }[]
    >
  >;
  postId: string;
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
}

export default function Comments({
  comments,
  setComment,
  postId,
  closeAllModals,
}: CommentsProps) {
  const { classes } = useCommentsStyles();
  const [commentBody, setCommentBody] = useState('');
  const dummy = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleModalClick = async () => {
    const token = Cookies.get('sillusr');
    if (!token) {
      openModal({
        title: 'Stay with us',
        children: <Login closeAllModals={closeAllModals} />,
      });
    } else {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_HEROKU_BACKEND_URI}/api/comments/new/${postId}`,
          {
            body: commentBody,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCommentBody('');
        setComment((prev) => [...prev, res.data.data]);
        closeAllModals();
        showNotification({
          id: 'load-data-user',
          color: 'teal',
          title: 'Comment was created successfully',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
      } catch (e) {
        showNotification({
          id: 'load-data-user',
          color: 'red',
          title: 'User could not been created',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconBug size={16} />,
          autoClose: 4000,
        });
      }
    }
  };

  return (
    <>
      <div className={styles.Commentscontainer}>
        {comments.map((comment) => (
          <div key={comment._id} className={styles.eachComment}>
            <Group>
              <Avatar
                src={comment.author.imagesDone.avatar}
                alt={comment.author.name}
                radius='xl'
                size={30}
              />
              <div>
                <Text size='sm'>{comment.author.name}</Text>
                <Text size='xs' color='dimmed'>
                  {new Date(comment.createdAt).toLocaleTimeString()}
                </Text>
              </div>
            </Group>
            <Text className={classes.body} size='sm'>
              {comment.body}
            </Text>
            <div ref={dummy} />
          </div>
        ))}
      </div>

      <TextInput
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        label='Leave a comment'
        placeholder='Your comment'
      />
      <Button fullWidth onClick={handleModalClick} mt='md'>
        Send
      </Button>
    </>
  );
}
