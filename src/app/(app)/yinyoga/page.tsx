import React from 'react';
import DefaultHero from '@/app/components/hero/default-hero';
import DefaultCTA from '@/app/components/utils/default-CTA';

import { Metadata } from 'next';
import YinyogaBackground from '@/app/components/yinyogasections/yinyoga-background';
import YinYogaConnections from '@/app/components/yinyogasections/yinyoga-connection';
import YinyogaClasses from '@/app/components/yinyogasections/yinyoga-classes';

export const metadata: Metadata = {
  title: 'Ralf Kedja | Yinyoga',
  description:
    'Yinyoga är en lugn och meditativ yogaform som passar alla. Läs om yinyoga och dess fördelar samt boka en yinyogaklass.',
};

export default function Page() {
  return (
    <>
      <DefaultHero title='Yinyoga' />
      <section style={{ padding: '2rem 0' }}>
        <YinyogaBackground />
      </section>
      <section style={{ backgroundColor: 'var(--tertiary-200)', padding: '2rem 0' }}>
        <YinYogaConnections />
      </section>
      <section style={{ padding: '2rem 0' }}>
        <YinyogaClasses />
      </section>
      <section style={{ backgroundColor: 'var(--tertiary-200)', padding: '2rem 0' }}>
        <DefaultCTA
          title='Är du intresserad av att testa på Yinyoga?'
          buttonText='Köp klippkort här'
          buttonHref='https://www.bokadirekt.se/places/eskilstuna-kroppsbalansering-25963'
        />
      </section>
    </>
  );
}
