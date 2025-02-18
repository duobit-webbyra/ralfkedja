import { redirect } from 'next/navigation';
import LoginForm from './login-form';
import { getUser } from '@/app/providers/auth-server';

export default async function Page() {
  const user = await getUser();

  if (user) {
    redirect('/medlemssida');
    return null;
  }

  return <LoginForm />;
}
