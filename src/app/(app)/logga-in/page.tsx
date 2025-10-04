import { redirect } from 'next/navigation'
import LoginForm from './login-form'
import { getUser } from '@/app/providers/getUser'

export default async function Page() {
  const user = await getUser()

  if (user) {
    redirect('/medlemssida')
    return null
  }

  return <LoginForm />
}
