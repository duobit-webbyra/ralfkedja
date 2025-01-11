// import { getPayload } from 'payload';
import PrimaryButton from '@/app/components/button/primary-button';
// import config from '@payload-config';

export default function BookDirectly({ children }: { children: string }) {
  // const payload = await getPayload({ config });
  // const data = await payload.findGlobal({
  //   slug: 'contact',
  // });

  return (
    <PrimaryButton href='https://www.bokadirekt.se/places/eskilstuna-kroppsbalansering-25963'>
      <p>{children}</p>
    </PrimaryButton>
  );
}
