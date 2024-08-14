'use client';

import style from './nav.module.scss';
import PrimaryButton from '../button/primary-button';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

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

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className={style.container}>
      <div className={style.content}>
        <ul className={style.nav}>
          {navigation.map((item, index) => {
            return (
              <li key={index} className={`${pathname === item?.slug ? style.active : ''}`}>
                {item.slug ? <Link href={`${item.slug}`}>{item.label}</Link> : <p>{item.label}</p>}
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
