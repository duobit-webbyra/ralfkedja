'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from '@/app/components/link/link';
import PrimaryButton from '../button/primary-button';
import MenuOpenButton from './menu-open-button';
import MenuCloseButton from './menu-close-button';
import BookDirectly from '../utils/book-directly';
import { useAuth } from '@/app/providers/auth';
import Container from '@/app/components/essentials/Container';
import style from './nav.module.scss';

interface NavigationData {
  label: string;
  slug?: string;
}

const navigation: NavigationData[] = [
  { label: 'Hem', slug: '/' },
  { label: 'Behandlingar', slug: '/behandlingar' },
  { label: 'Yinyoga', slug: '/yinyoga' },
  { label: 'Kurser', slug: '/kurser' },
  { label: 'Om mig', slug: '/om-mig' },
  { label: 'Galleri', slug: '/galleri' },
  { label: 'Kontakt', slug: '/kontakt' },
];

export function NavDefault({
  user,
  handleLogout,
  router,
}: {
  user: any;
  handleLogout: () => void;
  router: any;
}) {
  const pathname = usePathname();

  return (
    <Container className='flex justify-between items-center w-full h-[var(--nav-height)] px-4 bg-tertiary-250'>
      <ul className='flex items-center gap-10'>
        {navigation.map((item, index) => (
          <li
            key={index}
            className={`relative flex items-center ${
              pathname === item.slug
                ? 'after:content-[""] after:absolute after:bottom-0 after:h-[2px] after:w-full after:bg-black'
                : ''
            }`}
          >
            <Link href={item.slug || '/'} className='hover:text-gray-700'>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className='flex items-center gap-4'>
        <BookDirectly>Boka tid</BookDirectly>
        {user && <Link href='/medlemssida'>Medlemssida</Link>}
        <PrimaryButton onClick={() => (user ? handleLogout() : router.push('/logga-in'))}>
          {user ? 'Logga ut' : 'Logga in'}
        </PrimaryButton>
      </div>
    </Container>
  );
}

export function NavMobile({
  user,
  handleLogout,
  router,
}: {
  user: any;
  handleLogout: () => void;
  router: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [isOpen]);

  return (
    <div className='flex justify-between items-center w-full px-4 h-[var(--nav-height)] bg-tertiary-250'>
      <Link href='/' className='text-2xl'>
        Ralf Kedja
      </Link>
      <div className='w-8 h-8 z-50' onClick={toggleMenu}>
        {!isOpen ? <MenuOpenButton /> : <MenuCloseButton />}
      </div>
      <ul
        className={`fixed top-[0] left-0 w-full h-full bg-tertiary-250 flex flex-col items-center gap-8 md:gap-12 pt-16 transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {navigation.map((item, index) => (
          <li
            key={index}
            className={`relative flex items-center ${
              pathname === item.slug
                ? 'after:content-[""] after:absolute after:bottom-[-1] after:h-[2px] after:w-full after:bg-black'
                : ''
            }`}
          >
            <Link
              href={item.slug || '/'}
              onClick={toggleMenu}
              className='hover:text-gray-700 text-2xl md:text-4xl'
            >
              {item.label}
            </Link>
          </li>
        ))}
        <div className='flex flex-col gap-4 items-center '>
          {user && (
            <Link href='/medlemssida' onClick={toggleMenu} className='hover:text-gray-700 text-2xl'>
              Medlemssida
            </Link>
          )}
          <PrimaryButton
            onClick={() => {
              if (user) {
                handleLogout();
              } else {
                router.push('/logga-in');
              }
              toggleMenu();
            }}
          >
            {user ? 'Logga ut' : 'Logga in'}
          </PrimaryButton>
          <BookDirectly>Boka tid</BookDirectly>
        </div>
      </ul>
    </div>
  );
}

export default function Nav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <header className='sticky top-0 z-[500] bg-tertiary-250'>
      {/* NavDefault is visible above 1100px */}
      <div className={style.navDefault}>
        <NavDefault user={user} handleLogout={handleLogout} router={router} />
      </div>

      {/* NavMobile is visible below 1100px */}
      <div className={style.navMobile}>
        <NavMobile user={user} handleLogout={handleLogout} router={router} />
      </div>
    </header>
  );
}
