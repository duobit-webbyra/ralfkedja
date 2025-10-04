import PrinciplesGrid from '@/app/components/about-me/principles-grid';
import SelfIntro from '@/app/components/about-me/self-intro';
import DefaultHero from '@/app/components/hero/default-hero';
import DiplomaBanner from '@/app/components/utils/diploma-banner';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ralf Kedja | Om mig',
  description:
    'Lär känna Ralf Kedja, expert på kroppsbalansering och hälsa. Läs om min bakgrund, utbildning och engagemang för att hjälpa dig må bättre.',
};

export default function Page() {
  return (
    <>
      <DefaultHero title='Om Mig' />
      <section
        style={{
          paddingBlock: '4rem',
        }}
      >
        <SelfIntro />
      </section>
      <section
        style={{
          paddingBlock: '4rem',
          backgroundColor: 'var(--secondary-100)',
        }}
      >
        <PrinciplesGrid />
      </section>
      <section
        style={{
          paddingBlock: '4rem',
          backgroundColor: 'var(--tertiary-200)',
        }}
      >
        <DiplomaBanner />
      </section>
    </>
  );
}
