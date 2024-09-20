import React from 'react';
import DefaultHero from '@/app/components/hero/default-hero';
import DefaultCTA from '@/app/components/utils/default-CTA';
import StrukturellBehandling from '@/app/components/treatments/strukturell-behandling';
import Kroppsbalansering from '@/app/components/treatments/kroppsbalansering';
import Kinesiologi from '@/app/components/treatments/kinesiologi';
import Biomagnetism from '@/app/components/treatments/biomagnetism';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ralf Kedja | Behandlingar',
  description:
    'Upptäck de olika behandlingar som erbjuds inom kroppsbalansering, kinesiologi och biomagnetism. Läs om metoderna och deras fördelar.',
};

export default function Page() {
  return (
    <>
      <DefaultHero title='Behandlingar' />
      <section id='strukturell-behandling' style={{ padding: '2rem 0' }}>
        <StrukturellBehandling />
      </section>

      <section
        id='kroppsbalansering'
        style={{ backgroundColor: 'var(--tertiary-200)', padding: '2rem 0' }}
      >
        <Kroppsbalansering />
      </section>

      <section id='kinesiologi' style={{ padding: '2rem 0' }}>
        <Kinesiologi />
      </section>

      <section
        id='biomagnetism'
        style={{ backgroundColor: 'var(--secondary-100)', padding: '2rem 0' }}
      >
        <Biomagnetism />
      </section>

      <section style={{ backgroundColor: 'var(--tertiary-200)', padding: '2rem 0' }}>
        <DefaultCTA />
      </section>
    </>
  );
}
