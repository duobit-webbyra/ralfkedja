import { redirect } from 'next/navigation';
import { getUser } from '@/app/providers/auth-server';

export default async function Page() {
  const { user } = await getUser();

  if (!user) {
    redirect('/logga-in');
  }

  return (
    <div>
      <h1>Videos</h1>¨<div></div>
    </div>
  );
}
