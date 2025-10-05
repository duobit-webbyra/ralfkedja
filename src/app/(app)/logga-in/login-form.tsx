'use client'

import React, { useActionState } from 'react'
import Image from 'next/image'
import { Form, Input } from '@/app/components/Form'
import { Link } from '@/app/components/link/link'
import Container from '@/app/components/essentials/Container'
import SecondaryButton from '@/app/components/button/secondary-button'
import Turnstile from '@/app/components/turnstile'
import { loginAction } from '@/app/providers/login'
import { useAuth } from '@/app/providers/auth'

export default function LoginForm() {
  const { login } = useAuth()
  const [state, formAction] = useActionState(loginActionWrapper, null)

  async function loginActionWrapper(prevState: any, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const result = await loginAction(email, password)

    if (result.success) {
      // Redirect client-side
      window.location.href = '/medlemssida'
    }

    return result
  }

  return (
    <section className="relative flex min-h-[calc(100vh-var(--nav-height)-var(--info-header-height))] items-center justify-center">
      {/* Background Image */}
      <Image
        src="/nature3.webp"
        alt="Background"
        layout="fill"
        quality={100}
        className="-z-10 object-cover" // Ensure the image is behind all other elements
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-85 -z-10"></div>

      {/* Content */}
      <Container className="relative flex flex-col gap-12  text-white items-center justify-center">
        <div className="bg-black/50 px-12 pt-8 w-full rounded-3xl max-w-[600px] shadow-lg flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-white! text-center sm:whitespace-nowrap  text-3xl! md:text-4xl!">
              Logga in till medlemssidan
            </h1>
            <span className="text-white! text-center">
              Logga in för att få tillgång till exklusivt extramaterial. Är du inte medlem ännu men
              intresserad?{' '}
              <Link href="/kontakt" className="!underline">
                Kontakta mig
              </Link>{' '}
              för mer information!
            </span>
          </div>
          <Form className="flex flex-col gap-8 w-full" action={formAction}>
            <div className="flex flex-col gap-4 w-full">
              <Input className="bg-white" placeholder="E-post" name="email" type="email" required />
              <Input
                className="bg-white"
                placeholder="Lösenord"
                name="password"
                type="password"
                required
              />
            </div>

            {state && <p className="text-red-400! ">{state.error}</p>}
            <div className="w-full flex justify-center">
              <div className="w-max">
                <SecondaryButton type="submit">Logga in</SecondaryButton>
              </div>
            </div>
            <Turnstile />
          </Form>
        </div>
      </Container>
    </section>
  )
}
