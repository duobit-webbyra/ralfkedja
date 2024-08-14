import style from './info.module.scss';

import { MdOutlineLocationOn } from 'react-icons/md';
import { MdOutlinePhone } from 'react-icons/md';
import { MdOutlineMail } from 'react-icons/md';

export default function HeaderInfo() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <p style={{ fontSize: 'var(--text-md)' }}>Ralf Kedja</p>
        <div className={style.info}>
          <div className={style.item}>
            <MdOutlineLocationOn />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                lineHeight: '1.25',
              }}
            >
              <span>Bruksgatan 8B</span>
              <span
                style={{
                  color: 'var(--primary-100)',
                  fontSize: 'var(--text-xs)',
                }}
              >
                632 20, Eskilstuna
              </span>
            </div>
          </div>
          <div className={style.item}>
            <MdOutlinePhone transform='rotate(10)' />
            <span>010-0000000</span>
          </div>
          <div className={style.item}>
            <MdOutlineMail />
            <span>ralked@hotmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
