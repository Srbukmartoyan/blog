import { useAllPosts } from '../hooks/useAllPosts';
import useAuth from '../hooks/useAuth';

import Group from '../components/Group';

const InfoPage = () => {
  const token = useAuth();
  const { allPosts, isLoading, isError } = useAllPosts();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div  className='mt-4 text-center text-red-700 font-bold'>{isError.message}</div>;

  const groupedPosts = allPosts.reduce((acc, post) => {
    const authorId = post.Author.id;
    if (!acc[authorId]) {
      acc[authorId] = {
        author: post.Author,
        posts: []
      };
    }
    acc[authorId].posts.push(post);
    return acc;
  }, {});

  const groupedPostsArray = Object.values(groupedPosts);

  return (
      <div className='container mx-auto my-8 px-4 py-4 rounded-md'>
        {groupedPostsArray.map((group, index) => (
          <Group
            key={index}
            posts={group.posts}
            title={`Posts by ${group.author.name}`}
          />
        ))}
      </div>
  );
};

export default InfoPage;
