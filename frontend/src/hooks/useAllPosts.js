import useSWR from 'swr';
import { simpleFetcher } from '../utils/fetcher';

export const useAllPosts = (page = 1, limit = 10) => {
  const { data: allPosts, error } = useSWR(`/posts?page=${page}&limit=${limit}`, simpleFetcher);

  return {
    allPosts,
    isLoading: !error && !allPosts,
    isError: error
  };
};
