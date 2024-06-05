export const authFetcher = (url) => {
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

export const simpleFetcher = (...args) => fetch(...args).then(res => res.json());
