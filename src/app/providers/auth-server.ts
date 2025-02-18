import { cookies } from 'next/headers';

export async function getUser() {
  const cookieStore = cookies(); // Get cookies for auth
  const token = cookieStore.get('payload-token')?.value;

  if (!token) return null; // No token = not logged in

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store', // Always get fresh user data
  });

  if (!res.ok) return null; // Invalid token or no user
  return await res.json(); // Return user object
}
