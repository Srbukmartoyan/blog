import useSWR from 'swr';
import { authFetcher } from '../utils/fetcher';

export const useAllPosts = (page, limit, searchTerm, selectedHashtags) => {
  const hashtagsQuery = selectedHashtags?.length > 0 ? selectedHashtags.join(',') : '';
  const { data: allPosts, error } = useSWR(`/posts?page=${page}&limit=${limit}&search=${searchTerm}&hashtags=${hashtagsQuery}`, authFetcher);

  return {
    allPosts: allPosts?.posts,
    totalPosts: allPosts?.count,
    isLoading: !error && !allPosts,
    isError: error
  };
};
