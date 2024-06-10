import useSWR from 'swr';
import { authFetcher } from '../utils/fetcher';

export const useAllPosts = (page, limit, searchTerm) => {
  const { data: allPosts, error } = useSWR(`/posts?page=${page}&limit=${limit}&search=${searchTerm}`, authFetcher);

  return {
    allPosts: allPosts?.posts,
    totalPosts: allPosts?.count,
    isLoading: !error && !allPosts,
    isError: error
  };
};
