import getContactData from '@/app/utils/get-contact-data';
import { MdOutlineLocationOn } from 'react-icons/md';
import { MdOutlinePhone } from 'react-icons/md';
import { MdOutlineMail } from 'react-icons/md';
import style from './short-info.module.scss';
import Link from 'next/link';
export default async function ShortInfo() {
  const data = await getContactData();

  return (
    <div className={style.container}>
      <div className={style.item}>
        <Link
          href={`http://maps.google.com/?q=${data?.address.street} ${data?.address.zipcode} ${data?.address.city}`}
        >
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
        </Link>
      </div>
      <div className={style.item}>
        <Link href={`tel:${data?.phone}`}>
          <MdOutlinePhone transform='rotate(10)' />
          <span>{data?.phone}</span>
        </Link>
      </div>
      <div className={style.item}>
        <Link href={`mailto:${data?.email}`}>
          <MdOutlineMail />
          <span>{data?.email}</span>
        </Link>
      </div>
    </div>
  );
}
