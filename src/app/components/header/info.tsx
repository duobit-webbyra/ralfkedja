import style from './info.module.scss';

// import { MdOutlineLocationOn } from 'react-icons/md';
// import { MdOutlinePhone } from 'react-icons/md';
// import { MdOutlineMail } from 'react-icons/md';

// import getContactData from '@/app/utils/get-contact-data';
import ShortInfo from '../utils/short-info';

export default async function HeaderInfo() {
  // const data = await getContactData();

  return (
    <div className={style.container}>
      <div className={style.content}>
        <p style={{ fontSize: 'var(--text-md)' }}>Ralf Kedja</p>
        <ShortInfo />
        {/* <div className={style.info}> */}
        {/*   <div className={style.item}> */}
        {/*     <MdOutlineLocationOn /> */}
        {/*     <div */}
        {/*       style={{ */}
        {/*         display: 'flex', */}
        {/*         flexDirection: 'column', */}
        {/*         lineHeight: '1.25', */}
        {/*       }} */}
        {/*     > */}
        {/*       <span>{data?.address.street}</span> */}
        {/*       <span */}
        {/*         style={{ */}
        {/*           color: 'var(--primary-100)', */}
        {/*           fontSize: 'var(--text-xs)', */}
        {/*         }} */}
        {/*       > */}
        {/*         {data?.address.zipcode}, {data?.address.city} */}
        {/*       </span> */}
        {/*     </div> */}
        {/*   </div> */}
        {/*   <div className={style.item}> */}
        {/*     <MdOutlinePhone transform='rotate(10)' /> */}
        {/*     <span>{data?.phone}</span> */}
        {/*   </div> */}
        {/*   <div className={style.item}> */}
        {/*     <MdOutlineMail /> */}
        {/*     <span>{data?.email}</span> */}
        {/*   </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
