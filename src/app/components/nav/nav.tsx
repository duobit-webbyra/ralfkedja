'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Link } from '@/app/components/link/link'
import PrimaryButton from '../button/primary-button'
import MenuOpenButton from './menu-open-button'
import MenuCloseButton from './menu-close-button'
import BookDirectly from '../utils/book-directly'
import { useAuth } from '@/app/providers/auth'
import Container from '@/app/components/essentials/Container'
import { logoutAndRedirect } from '@/app/providers/logout'

interface NavigationData {
  label: string
  slug?: string
}

const navigation: NavigationData[] = [
  { label: 'Hem', slug: '/' },
  { label: 'Behandlingar', slug: '/behandlingar' },
  { label: 'Yinyoga', slug: '/yinyoga' },
  { label: 'Kurser', slug: '/kurser' },
  { label: 'Om mig', slug: '/om-mig' },
  { label: 'Galleri', slug: '/galleri' },
  { label: 'Kontakt', slug: '/kontakt' },
]

export function NavDefault({ user }: { user: any }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Container className="relative flex justify-between items-center w-full h-[var(--nav-height)] px-4 bg-tertiary-250">
      <ul className="flex h-full items-center gap-10">
        {navigation.map((item, index) => (
          <li
            key={index}
            className={`relative h-full flex items-center ${
              pathname === item.slug
                ? 'after:content-[""] after:absolute after:bottom-0 after:h-[4px] after:w-full after:bg-black'
                : ''
            }`}
          >
            <Link href={item.slug || '/'} className="hover:text-gray-800">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        <BookDirectly>Boka tid</BookDirectly>
        {user && <Link href="/medlemssida">Medlemssida</Link>}
        <PrimaryButton onClick={() => (user ? logoutAndRedirect() : router.push('/logga-in'))}>
          {user ? 'Logga ut' : 'Logga in'}
        </PrimaryButton>
      </div>
    </Container>
  )
}

export function NavMobile({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  const handleLogin = async () => {
    router.push('/logga-in')
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'scroll'
    }
    return () => {
      document.body.style.overflow = 'scroll'
    }
  }, [isOpen])

  return (
    <div className="flex justify-between items-center w-full px-4 h-[var(--nav-height)] bg-tertiary-250">
      <Link href="/" className="text-3xl!">
        Ralf Kedja
      </Link>
      <div className="w-8 h-8 z-50" onClick={toggleMenu}>
        {!isOpen ? <MenuOpenButton /> : <MenuCloseButton />}
      </div>
      <ul
        className={`fixed top-[0] pb-4 overflow-y-auto left-0 w-full h-full bg-tertiary-250 flex flex-col items-center gap-8 md:gap-12 pt-16 transition-transform duration-300 ${
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
              className="hover:text-gray-700 text-2xl! md:text-4xl!"
            >
              {item.label}
            </Link>
          </li>
        ))}
        <div className="flex flex-col gap-4 items-center ">
          {user && (
            <Link href="/medlemssida" className="text-2xl! md:text-4xl!">
              Medlemssida
            </Link>
          )}
          <PrimaryButton onClick={() => (user ? logoutAndRedirect() : handleLogin())}>
            {user ? 'Logga ut' : 'Logga in'}
          </PrimaryButton>
          <BookDirectly>Boka tid</BookDirectly>
        </div>
      </ul>
    </div>
  )
}
