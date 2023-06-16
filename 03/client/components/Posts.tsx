import styles from '../styles/Posts.module.scss';
import Image from 'next/image';
import { ActionIcon, Avatar, Group, Text } from '@mantine/core';
import { IconHeart, IconMessageDots } from '@tabler/icons';
import { useState } from 'react';
import { openModal, closeAllModals } from '@mantine/modals';
import Comments from './Comments';
import axios from 'axios';
import Cookies from 'js-cookie';
import Login from './Login';
import { IconCheck, IconBug } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

interface PostsProps {
  user?: any;
  _id?: number | string;
  urlImage: string;
  title: string;
  postId: string;
  likesAmount: number;
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

export default function Posts({
  postId,
  urlImage,
  title,
  likesAmount,
  comments,
  user,
}: PostsProps) {
  const [likeLoading, setLikeloading] = useState(false);
  const [likesToRender, setLikesToRender] = useState(likesAmount);
  const [commentsToRender, setCommentsToRender] = useState(comments);

  const commentsAmount = commentsToRender.length || 0;

  async function handleClick() {
    const token = Cookies.get('sillusr');
    if (!token) {
      openModal({
        title: 'Stay with us',
        children: <Login closeAllModals={closeAllModals} />,
      });
    } else {
      setLikeloading(true);
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_HEROKU_BACKEND_URI}/api/posts/update/${postId}`,
          {
            likes: likesAmount + 1,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLikesToRender(res.data.data.likes);
        showNotification({
          id: 'load-data-user',
          color: 'teal',
          title: 'Like was created successfully',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
      } catch {
        showNotification({
          id: 'load-data-user',
          color: 'red',
          title: 'Like could not been created',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconBug size={16} />,
          autoClose: 4000,
        });
      } finally {
        setLikeloading(false);
      }
    }
  }

  return (
    <div className={styles.posts}>
      {user && (
        <Group className={styles.postshead}>
          <Avatar
            src={user.imagesDone.avatar}
            alt={user.name}
            radius='xl'
            size={30}
          />
          <Text>{user.name}</Text>
        </Group>
      )}
      <div className={styles.postsImageContainer}>
        <Image
          src={urlImage}
          alt={title}
          width={700}
          height={500}
          className={styles.postsImage}
        />
      </div>
      <p className={styles.postFooter}>{title}</p>
      <div className={styles.postsInfo}>
        <div className={styles.postsTriggers}>
          <ActionIcon
            radius='md'
            variant='transparent'
            loading={likeLoading}
            onClick={handleClick}
          >
            <IconHeart size={28} />
          </ActionIcon>
          <ActionIcon
            radius='md'
            variant='transparent'
            onClick={() => {
              openModal({
                title: 'Comments',
                children: (
                  <Comments
                    comments={commentsToRender}
                    setComment={setCommentsToRender}
                    postId={postId}
                    closeAllModals={closeAllModals}
                  />
                ),
              });
            }}
          >
            <IconMessageDots size={28} />
          </ActionIcon>
        </div>
        <div className={styles.postsInfoTriggers}>
          <span>{likesToRender} Likes</span>
          <span>{commentsAmount} Comments</span>
        </div>
      </div>
    </div>
  );
}
