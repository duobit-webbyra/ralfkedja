import React from 'react';
import GalleryGrid from '@/app/components/gallery/gallery';
import DefaultHero from '@/app/components/hero/default-hero';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ralf Kedja | Galleri',
  description:
    'Se exempel på arbete och behandlingar i galleriet. Få en visuell inblick i hur tjänsterna kan hjälpa dig att må bättre.',
};
export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <>
      <DefaultHero title='Galleri' />
      <section style={{ paddingBlock: '4rem' }}>
        <GalleryGrid />
      </section>
    </>
  );
}
