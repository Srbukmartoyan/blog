import useSWR from 'swr';
import { simpleFetcher } from '../utils/fetcher';

export const useAllPosts = () => {
  const { data: allPosts, error } = useSWR('/posts', simpleFetcher);

  return {
    allPosts,
    isLoading: !error && !allPosts,
    isError: error
  };
};
