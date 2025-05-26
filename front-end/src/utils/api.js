export async function authFetch(url, method = 'GET', data) {
  const token = localStorage.getItem('token');

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : null,
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || 'Something went wrong');
  }

  return responseData;
}
