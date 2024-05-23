import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import Group from '../components/Group';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const FullBlog = () => {
  const { blogId } = useParams();

  const { data: blogPost, error } = useSWR(`/posts/${blogId}`, fetcher);
  const authorId = blogPost?.Author?.id;

  const { data: authorPosts, error: authorPostsError } = useSWR(
    authorId ? `/authors/${authorId}/posts` : null,
    fetcher
  );

  if (error) return <div>Failed to load blog post</div>;
  if (!blogPost) return <div>Loading...</div>;
  if (authorPostsError) return <div>Failed to load author's posts</div>;

  return (
    <div className='mx-auto px-8 py-4 bg-slate-200 rounded-md w-full'>
        <div className='lg:w-1/3 bg-white shadow-md rounded-md mx-auto my-10 p-9 hover:scale-110 transition ease-linear duration-150'>
          <h2 className='text-xl font-semibold mb-4 text-center'>{blogPost.title}</h2>
          <p className='text-gray-600 mb-2'>Author: {blogPost.Author?.name}</p>
          <p className='text-gray-600 mb-2'>Publication Date: {blogPost.createdAt}</p>
          <p className='text-gray-800'>{blogPost.content}</p>

          {blogPost.Image && (
            <div className="mt-4">
              <img key={blogPost.Image.id} src={blogPost.Image.url} alt={`Image ${blogPost.Image.id}`} className="w-60 h-60 my-2 object-contain mx-auto" />
            </div>
          )}

          <div className="mt-5 flex justify-center">
            {blogPost.Hashtags && blogPost.Hashtags.map(hashtag => (
              <span key={hashtag.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {hashtag.name}
              </span>
            ))}
          </div>
        </div>
        {authorPosts ? (
        <Group posts={authorPosts} title={`More posts by ${blogPost.Author?.name}`} />
      ) : (
        <p>Loading author's posts...</p>
      )}
    </div>
  )
}

export default FullBlog;
