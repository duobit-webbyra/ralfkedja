import style from './footer.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { FaRegCopyright } from 'react-icons/fa';
import ShortInfo from '../utils/short-info';
import assetPrefix from '@/app/utils/asset-prefix';

export default function Footer() {
  return (
    <footer className={style.container}>
      <div className={style.content}>
        <div className={style['info-row']}>
          <div className={style['name-copyright']}>
            <p style={{ fontSize: 'var(--text-md)' }}>Ralf Kedja</p>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
                color: 'var(--primary-100)',
              }}
            >
              Copyright <FaRegCopyright /> 2024
            </p>
          </div>
          <ShortInfo />
        </div>
        <div className={style.attribution}>
          <p>Sida producerad av</p>
          <Link href='https://duobit.se'>
            <Image
              src={assetPrefix('duobit-logo-inverted.svg')}
              width={100}
              height={100}
              alt='Duobit Webbyrå'
              className={style.logo}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
