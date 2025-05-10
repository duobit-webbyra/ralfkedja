import Nav from './nav';
import { cookies } from 'next/headers'; // Use cookies to fetch the user session
import { rest } from '@/app/providers/rest';

export default async function NavWrapper() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('payload-token')?.value;

  let user = null;

  if (authToken) {
    try {
      // Fetch the user data from your API
      user = await rest(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
        {},
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }

  return <Nav user={user} />; // Pass only the user data to the Nav component
}
