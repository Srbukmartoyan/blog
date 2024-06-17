import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { TOKEN_REFRESH_INTERVAL } from '../constants';

const useAuth = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(localStorage.getItem('auth-token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh-token'));

  useEffect(() => {
    const handleRefreshToken = async () => {
      try {
        const response = await fetch('/refresh-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
          // console.log('hereeeeee', data.accessToken);
          const data = await response.json();
          setAccessToken(data.accessToken);
          localStorage.setItem('auth-token', data.accessToken);
        } else {
          // Handle token refresh failure due to expired refresh token
          if (response.status === 401) {
            console.error('Refresh token has expired');
            localStorage.removeItem('auth-token');
            localStorage.removeItem('refresh-token');
            navigate('/login');
          } else {
            console.error('Failed to refresh token:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
        navigate('/login'); 
      }
    };

    const interval = setInterval(handleRefreshToken, TOKEN_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [refreshToken, navigate]);

  if (!accessToken) {
    navigate('/login');
  }

  return accessToken;
};

export default useAuth;



// const useAuth = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('auth-token');

//   if (!token) {
//     navigate('/notfound');
//   }

//   return token;
// };

// export default useAuth;


// const handleTokenRefresh = async (refreshToken) => {
//   try {
//       const response = await fetch('/refresh-token', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ refreshToken }),
//       });

//       if (response.ok) {
//           const data = await response.json();
//           setAccessToken(data.accessToken);
//           localStorage.setItem('auth-token', data.accessToken);
//       } else {
//           // Handle token refresh failure due to expired refresh token
//           if (response.status === 401) {
//               console.error('Refresh token has expired');
//               // Clear tokens and redirect to login page
//               localStorage.removeItem('auth-token');
//               localStorage.removeItem('refresh-token');
//               navigate('/login');
//           } else {
//               // Handle other errors
//               console.error('Failed to refresh token:', response.statusText);
//           }
//       }
//   } catch (error) {
//       console.error('Failed to refresh token:', error);
//   }
// };
