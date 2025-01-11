import { getPayload } from 'payload';
import config from '@payload-config';

export default async function Announcement() {
  const payload = await getPayload({ config });

  const data = await payload.findGlobal({
    slug: 'announcement',
  });

  if (!data || !data.activate || !data.message) return null;

  return (
    <section
      style={{
        backgroundColor: 'var(--primary-300)',
        padding: '1rem 0',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        color: 'var(--secondary-100)',
        fontSize: '1.5rem',
        textAlign: 'center',
      }}
    >
      {data.message}
    </section>
  );
}
