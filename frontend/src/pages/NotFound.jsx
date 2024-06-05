import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='w-full h-[92vh] flex flex-col justify-center items-center bg-gray-200'>
      <h1 className='text-6xl font-bold mb-4 text-red-500'>404</h1>
      <p className='text-2xl mb-6'>Oops! The page you are looking for does not exist.</p>
      <Link to="/auth">
        <button className='px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300'>
          Go to Login
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
