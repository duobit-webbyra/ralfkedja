import { getPayload } from 'payload';
import config from '@payload-config';
import { Contact } from '@payload-types';

export default async function getContactData() {
  const payload = await getPayload({ config });

  const data: Contact = await payload.findGlobal({
    slug: 'contact',
  });

  if (!data) return undefined;

  return data;
}
