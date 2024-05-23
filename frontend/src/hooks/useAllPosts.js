import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export const useAllPosts = () => {
  const { data: allPosts, error } = useSWR('/posts', fetcher);

  return {
    allPosts,
    isLoading: !error && !allPosts,
    isError: error
  };
};
