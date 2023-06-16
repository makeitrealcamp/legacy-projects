import { api } from './axiosCreate';

export const fetchPosts = async (page = 1, options = {}) => {
  const res = await api.get(`/api/posts/all?page=${page}&limit=10`, options);
  return res.data;
};
