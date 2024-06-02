export const fetcher = (url) => {
  const token = localStorage.getItem('auth-token');
  if (!token) {
      alert('You must be logged in to make a request');
      return;
  }
  return fetch(url, {
      headers: {
          'auth-token': token,
          'Content-Type': 'application/json'
      }
  }).then(response => response.json());
};
