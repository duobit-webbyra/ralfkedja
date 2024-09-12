import { Metadata } from 'next';
import PrimaryButton from '../components/button/primary-button';
import SecondaryButton from '../components/button/secondary-button';
export const metadata: Metadata = {
  title: '404 hittas ej',
};

export default function Page() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        minHeight: 'calc(100vh - var(--nav-height) - 270px)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1>404</h1>
          <h4> Sidan kunde inte hittas</h4>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <PrimaryButton href='/'>Återvänd</PrimaryButton>
          <SecondaryButton href='/kontakt'>Kontakta mig</SecondaryButton>
        </div>
      </div>
    </main>
  );
}
