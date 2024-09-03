import React from 'react';
import GalleryGrid from '@/app/components/gallery/gallery';
import DefaultHero from '@/app/components/hero/default-hero';
export default function page() {
  return (
    <>
      <DefaultHero title='Galleri' />
      <section style={{ paddingBlock: '4rem' }}>
        <GalleryGrid />
      </section>
    </>
  );
}
