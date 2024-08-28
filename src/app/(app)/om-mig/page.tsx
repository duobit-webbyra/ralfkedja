import PrinciplesGrid from '@/app/components/about-me/principles-grid';
import SelfIntro from '@/app/components/about-me/self-intro';
import DefaultHero from '@/app/components/hero/default-hero';
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
    </>
  );
}
