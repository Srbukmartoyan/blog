export const fetcher = (url) => {
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw new Error('You must be logged in.');
  }
  return fetch(url, {
      headers: {
          'auth-token': token,
          'Content-Type': 'application/json'
      }
  }).then(response => response.json());
};
