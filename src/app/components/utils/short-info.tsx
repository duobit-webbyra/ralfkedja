import getContactData from '@/app/utils/get-contact-data';
import { MdOutlineLocationOn } from 'react-icons/md';
import { MdOutlinePhone } from 'react-icons/md';
import { MdOutlineMail } from 'react-icons/md';
import style from './short-info.module.scss';

export default async function ShortInfo() {
  const data = await getContactData();

  return (
    <div className={style.container}>
      <div className={style.item}>
        <MdOutlineLocationOn />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: '1.25',
          }}
        >
          <span>{data?.address.street}</span>
          <span
            style={{
              color: 'var(--primary-100)',
              fontSize: 'var(--text-xs)',
            }}
          >
            {data?.address.zipcode}, {data?.address.city}
          </span>
        </div>
      </div>
      <div className={style.item}>
        <MdOutlinePhone transform='rotate(10)' />
        <span>{data?.phone}</span>
      </div>
      <div className={style.item}>
        <MdOutlineMail />
        <span>{data?.email}</span>
      </div>
    </div>
  );
}
