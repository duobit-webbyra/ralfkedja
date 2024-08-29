'use client';

import style from './nav.module.scss';
import PrimaryButton from '../button/primary-button';
import Link from 'next/link';
import MenuOpenButton from './menu-open-button';
import MenuCloseButton from './menu-close-button';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

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

import { useSelectedLayoutSegments } from 'next/navigation';

export function NavDefault() {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  console.log(segments);
  return (
    <header className={style.container}>
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
        <PrimaryButton>
          <p>Boka tid</p>
        </PrimaryButton>
      </div>
    </header>
  );
}

export function NavMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(style.noScroll);
    } else {
      document.body.classList.remove(style.noScroll);
    }
  }, [isOpen]);

  return (
    <header className={style.containerMobile}>
      <Link style={{ color: 'var(--tertiary-100)', fontSize: 'var(--text-md)' }} href='/'>
        Ralf Kedja
      </Link>

      <div className={style.menuicon} onClick={toggleMenu}>
        <MenuOpenButton />
      </div>

      <ul className={`${style.menuOpen} ${isOpen ? style.menuOpenActive : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <div className={style.menuiconclose} onClick={toggleMenu}>
            <MenuCloseButton />
          </div>
        </div>

        <div className={style.menuitems}>
          {navigation.map((item, index) => (
            <li key={index} className={`${pathname === item?.slug ? style.active : ''}`}>
              <div className={style.navItem}>
                <Link onClick={toggleMenu} href={`${item.slug}`}>
                  {item.label}
                </Link>
              </div>
            </li>
          ))}
          <PrimaryButton href='https://www.bokadirekt.se/places/eskilstuna-kroppsbalansering-25963'>
            <p>Boka tid</p>
          </PrimaryButton>
        </div>
      </ul>
    </header>
  );
}

export default function Nav() {
  return (
    <>
      <NavDefault />
      <NavMobile />
    </>
  );
}
