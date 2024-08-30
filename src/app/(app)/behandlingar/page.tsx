import React from 'react';
import DefaultHero from '@/app/components/hero/default-hero';
import DefaultCTA from '@/app/components/utils/default-CTA';
import StrukturellBehandling from '@/app/components/treatments/strukturell-behandling';
import Kroppsbalansering from '@/app/components/treatments/kroppsbalansering';
import Kinesiologi from '@/app/components/treatments/kinesiologi';
import Biomagnetism from '@/app/components/treatments/biomagnetism';
export default function page() {
  return (
    <>
      <DefaultHero title='Behandlingar' />
      <div>
        <section id='strukturell-behandling' style={{ padding: '4rem 0' }}>
          <StrukturellBehandling />
        </section>

        <section
          id='kroppsbalansering'
          style={{ backgroundColor: 'var(--tertiary-200)', padding: '4rem 0' }}
        >
          <Kroppsbalansering />
        </section>

        <section id='kinesiologi' style={{ padding: '4rem 0' }}>
          <Kinesiologi />
        </section>

        <section
          id='biomagnetism'
          style={{ backgroundColor: 'var(--secondary-100)', padding: '4rem 0' }}
        >
          <Biomagnetism />
        </section>
        <section style={{ backgroundColor: 'var(--tertiary-200)', padding: '2rem 0' }}>
          <DefaultCTA />
        </section>
      </div>
    </>
  );
}
