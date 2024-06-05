import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('auth-token');
  
  if (!token) {
    navigate('/notfound');
  }

  return token;
};

export default useAuth;
