import { cookies } from 'next/headers';

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('payload-token')?.value;

  if (!token) return null;

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!serverUrl) {
    throw new Error('NEXT_PUBLIC_SERVER_URL environment variable is not defined');
  }

  const res = await fetch(`${serverUrl}/api/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) return null;
  const user = await res.json();
  return user;
}
