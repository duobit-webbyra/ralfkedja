import { redirect } from 'next/navigation';
import LoginForm from './login-form';
import { getUser } from '@/app/providers/auth-server';

export default async function Page() {
  const user = await getUser(); // Get the user from cookies (server-side)

  if (user) {
    redirect('/medlemssida'); // Redirect before rendering anything
  }

  return <LoginForm />;
}
