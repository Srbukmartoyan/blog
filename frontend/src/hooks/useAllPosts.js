import useSWR from 'swr';
import { simpleFetcher } from '../utils/fetcher';

export const useAllPosts = (page, limit) => {
  const { data: allPosts, error } = useSWR((page && limit) ? `/posts?page=${page}&limit=${limit}` : '/posts', simpleFetcher);

  return {
    allPosts,
    isLoading: !error && !allPosts,
    isError: error
  };
};
