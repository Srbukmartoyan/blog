import useAuth from '../hooks/useAuth';
import { BlogForm, LoadingIndicator } from '../components';

const CreateBlog = () => {
  const { isAuthChecking } = useAuth();

  if (isAuthChecking) return <LoadingIndicator />

  return (
    <div className='w-full h-[92vh] bg-slate-200 flex justify-center items-center'>
      <BlogForm />
    </div>
  )
}

export default CreateBlog;
