'use client';

import style from './nav.module.scss';
import PrimaryButton from '../button/primary-button';
import { Link } from '@/app/components/link/link';
import MenuOpenButton from './menu-open-button';
import MenuCloseButton from './menu-close-button';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import BookDirectly from '../utils/book-directly';
import { useAuth } from '@/app/providers/auth';
import { useRouter } from 'next/navigation';

interface NavigationData {
  label: string;
  slug?: string;
}

const navigation: NavigationData[] = [
  {
    label: 'Hem',
    slug: '/',
  },
  {
    label: 'Behandlingar',
    slug: '/behandlingar',
  },
  {
    label: 'Yinyoga',
    slug: '/yinyoga',
  },
  {
    label: 'Kurser',
    slug: '/kurser',
  },
  {
    label: 'Om mig',
    slug: '/om-mig',
  },
  {
    label: 'Galleri',
    slug: '/galleri',
  },
  {
    label: 'Kontakt',
    slug: '/kontakt',
  },
];

export function NavDefault() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <div className={`${style.content} ${style.hide}`}>
      <ul className={style.nav}>
        {navigation.map((item, index) => {
          return (
            <li key={index} className={`${pathname === item?.slug ? style.active : ''}`}>
              <div className={style.navItem}>
                <Link href={`${item.slug}`}>{item.label}</Link>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={style.buttons}>
        <BookDirectly>Boka tid</BookDirectly>
        {user && <Link href='/medlemssida'>Medlemssida</Link>}
        <PrimaryButton onClick={() => (user ? handleLogout() : router.push('/logga-in'))}>
          {user ? 'Logga ut' : 'Logga in'}
        </PrimaryButton>
      </div>
    </div>
  );
}

export function NavMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen((e) => !e);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
    return () => {};
  }, [isOpen]);

  return (
    <div className={style['content-mobile']}>
      <Link className='text-primary-400 text-3xl' href='/'>
        Ralf Kedja
      </Link>

      <div className={style.menuicon} onClick={toggleMenu}>
        {!isOpen ? <MenuOpenButton /> : <MenuCloseButton />}
      </div>

      <ul className={`${style['menu']} ${isOpen ? style['menu-open'] : style['menu-close']}`}>
        <div className={style['menu-items']}>
          {navigation.map((item, index) => (
            <li key={index} className={`${pathname === item?.slug ? style.active : ''}`}>
              <div className={style.navItem}>
                <Link onClick={toggleMenu} href={`${item.slug}`}>
                  {item.label}
                </Link>
              </div>
            </li>
          ))}
          <div
            style={{
              width: '50%',
            }}
          >
            <PrimaryButton href='https://www.bokadirekt.se/places/eskilstuna-kroppsbalansering-25963'>
              <p>Boka tid</p>
            </PrimaryButton>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default function Nav() {
  return (
    <>
      <header className={style.container}>
        <NavDefault />
        <NavMobile />
      </header>
    </>
  );
}
