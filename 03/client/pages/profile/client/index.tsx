import Layout from '../../../components/Layout';
import { GetServerSideProps } from 'next';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import styles from '../../../styles/Client.module.scss';
import ClientLayout from '../../../components/ClientLayout';
import Posts from '../../../components/Posts';
import { Center, Loader } from '@mantine/core';
import { usePosts } from '../../../hooks/posts';

interface ClientProfileProps {
  user: any;
  posts: any;
}

export default function Client({ user, posts }: ClientProfileProps) {
  const watcher = useRef<any>(null);
  const [page, setPage] = useState<number>(1);
  const [postsToRender, setPostsToRender] = useState<any[]>(posts);
  const { newPosts, isLoading, hasNextPage } = usePosts(page);
  useEffect(() => {
    if (!(page === 1)) {
      setPostsToRender((prev: any) => [...prev, ...newPosts]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPosts]);

  const lastPosts = useCallback(
    (post: HTMLDivElement) => {
      if (isLoading) return;
      if (watcher.current) {
        watcher.current.disconnect();
      }

      watcher.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          setPage((prev) => prev + 1);
        }
      });
      if (post && watcher.current) watcher.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  const posters = postsToRender.map((post: any, i: number) => {
    if (postsToRender.length === i + 1) {
      return (
        <div ref={lastPosts} key={post._id}>
          <Posts
            user={post.user}
            postId={post._id}
            urlImage={post.urlImage}
            title={post.title}
            likesAmount={post.likes}
            comments={post.comments}
          />
        </div>
      );
    } else {
      return (
        <div key={post._id}>
          <Posts
            user={post.user}
            postId={post._id}
            urlImage={post.urlImage}
            title={post.title}
            likesAmount={post.likes}
            comments={post.comments}
          />
        </div>
      );
    }
  });

  return (
    <Layout title={`Sillevon | ${user.name}`}>
      <ClientLayout>
        <div className={styles.clientProfile}>{posters}</div>
        {isLoading && (
          <Center>
            <Loader />
          </Center>
        )}
      </ClientLayout>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['sillusr'];
  let userData;
  let posts;
  let ordered;
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
    const res = await fetch(
      `${process.env.HEROKU_BACKEND_URI}/api/posts/all?limit=10&page=1`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );
    posts = await res.json();
    ordered = posts.data.docs;
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      user: userData.data,
      posts: ordered,
    },
  };
};
