import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getAuthToken } from '../utils/auth';

import { TOKEN_REFRESH_INTERVAL } from '../constants';

const useAuth = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(getAuthToken());
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh-token'));
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const updateToken = (newAccessToken) => {
    setAccessToken(newAccessToken);
    localStorage.setItem('auth-token', newAccessToken);
  }

  const handleRefreshTokenError = (status) => {
    if (status === 401) {
      console.error('Refresh token has expired');
      localStorage.removeItem('auth-token');
      localStorage.removeItem('refresh-token');
      navigate('/login');
    } else {
      console.error('Failed to refresh token:', status);
    }
  }

  const refreshAuthToken = async () => {
    try {
      const response = await fetch('/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        updateToken(data.accessToken);
      } else {
        handleRefreshTokenError(response.status);
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      navigate('/auth'); 
    } finally {
      setIsAuthChecking(false);
    }
  }

  useEffect(() => {
    const interval = setInterval(refreshAuthToken, TOKEN_REFRESH_INTERVAL);
    refreshAuthToken(); // initial call
    return () => clearInterval(interval);
  }, [refreshToken, navigate]);

  if (!accessToken) {
    navigate('/auth');
  }

  return { accessToken, isAuthChecking };
};

export default useAuth;

