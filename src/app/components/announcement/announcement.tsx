import { getPayload } from 'payload';
import config from '@payload-config';
import Container from '@/app/components/essentials/Container';

export default async function Announcement() {
  const payload = await getPayload({ config });

  const data = await payload.findGlobal({
    slug: 'announcement',
  });

  if (!data || !data.activate || !data.message) return null;

  return (
    <section className='bg-secondary-150 py-4 w-full flex justify-center text-white text-2xl text-center'>
      <Container>{data.message}</Container>
    </section>
  );
}
