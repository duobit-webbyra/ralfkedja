import style from './info.module.scss';
import ShortInfo from '../utils/short-info';
import { Link } from '@/app/components/link/link';
import Container from '@/app/components/essentials/Container';
export default async function HeaderInfo() {
  // const data = await getContactData();

  return (
    <Container className={`${style.container} min-h-[var(--info-header-height)]`}>
      <div className={style.content}>
        <Link style={{ color: 'var(--primary-400)', fontSize: 'var(--text-md)' }} href='/'>
          Ralf Kedja
        </Link>
        <ShortInfo />
      </div>
    </Container>
  );
}
