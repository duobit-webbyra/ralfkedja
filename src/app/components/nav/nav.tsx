'use client';

import style from './nav.module.scss';
import PrimaryButton from '../button/primary-button';
import Link from 'next/link';
import MenuOpenButton from './menu-open-button';
import MenuCloseButton from './menu-close-button';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import BookDirectly from '../utils/book-directly';

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

  return (
    <div className={style.content}>
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
      <div
        style={{
          width: '8rem',
        }}
      >
        <BookDirectly>Boka tid</BookDirectly>
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
      document.body.classList.add(style.scroll);
    } else {
      document.body.classList.remove(style.scroll);
    }
  }, [isOpen]);

  return (
    <div className={style['content-mobile']}>
      <Link style={{ color: 'var(--tertiary-100)', fontSize: 'var(--text-md)' }} href='/'>
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
