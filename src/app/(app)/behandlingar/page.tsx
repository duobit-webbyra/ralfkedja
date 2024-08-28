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
        <section id='strukturell-behandling' style={{ padding: '8rem 0' }}>
          <StrukturellBehandling />
        </section>
        <div style={{ position: 'relative' }}>
          <section id='kroppsbalansering' style={{ padding: '8rem 0' }}>
            <Kroppsbalansering />
          </section>
          <div
            style={{
              position: 'absolute',
              width: '560px',
              height: '560px',
              backgroundColor: 'var(--primary-300)',
              top: '50%',
              right: '20%',
              transform: 'translate(0%, -50%)',
              borderRadius: '100%',
            }}
          ></div>
          <section
            id='kinesiologi'
            style={{ backgroundColor: 'var(--tertiary-200)', padding: '8rem 0' }}
          >
            <Kinesiologi />
          </section>
        </div>
        <section
          id='biomagnetism'
          style={{ backgroundColor: 'var(--secondary-100)', padding: '8rem 0' }}
        >
          <Biomagnetism />
        </section>
        <DefaultCTA />
      </div>
    </>
  );
}
