import { cookies } from 'next/headers'; // Use cookies to fetch the user session
import { NavDefault, NavMobile } from './nav';
import style from './nav.module.scss';

export default async function NavWrapper() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('payload-token')?.value;

  let user = null;

  if (authToken) {
    try {
      const response = await fetch(`/api/users/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        cache: 'no-store', // Ensure fresh data is fetched
      });

      if (response.ok) {
        user = await response.json();
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }

  return (
    <header className='sticky top-0 z-[500] bg-tertiary-250'>
      {/* Render NavDefault for larger screens */}
      <div className={style.navDefault}>
        <NavDefault user={user} />
      </div>

      {/* Render NavMobile for smaller screens */}
      <div className={style.navMobile}>
        <NavMobile user={user} />
      </div>
    </header>
  );
}
