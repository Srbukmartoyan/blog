import useAuth from '../hooks/useAuth';
import { BlogForm } from '../components';

const CreateBlog = () => {
  const token = useAuth();
  return (
    <div className='w-full h-[92vh] bg-slate-200 flex justify-center items-center'>
      <BlogForm />
    </div>
  )
}

export default CreateBlog;
