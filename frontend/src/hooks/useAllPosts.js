import useSWR from 'swr';
import { authFetcher } from '../utils/fetcher';

export const useAllPosts = (page, limit) => {
  const { data: allPosts, error } = useSWR((page && limit) ? `/posts?page=${page}&limit=${limit}` : '/posts', authFetcher);

  return {
    allPosts: allPosts?.posts,
    totalPosts: allPosts?.count,
    isLoading: !error && !allPosts,
    isError: error
  };
};
