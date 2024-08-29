import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { Contact } from '@payload-types';

export default async function GetContactData() {
  const payload = await getPayloadHMR({ config });

  const data: Contact = await payload.findGlobal({
    slug: 'contact',
  });

  if (!data) return undefined;

  return data;
}
