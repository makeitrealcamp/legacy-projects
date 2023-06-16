import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { fetchPosts } from '../../lib/loadPosts';

export function usePosts(pageNumber: number) {
  const [newPosts, setNewPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const token = Cookies.get('sillusr');

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    (async () => {
      try {
        const res = await fetchPosts(pageNumber, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const posts = res.data.docs.reverse();
        setNewPosts(posts);
        setHasNextPage(res.data.hasNextPage);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [pageNumber, token]);

  return { newPosts, isLoading, isError, hasNextPage };
}
