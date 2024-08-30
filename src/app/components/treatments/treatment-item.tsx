import style from './treatment-item.module.scss';
import Leaf from '../graphics/leaf';

interface TreatmentItemProps {
  heading: string;
  description: string;
}

export default function TreatmentItem({ heading, description }: TreatmentItemProps) {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <div style={{ height: '32px', width: '32px', rotate: '260deg' }}>
          <Leaf />
        </div>
        <h1>{heading}</h1>
      </div>
      <p>{description}</p>
    </div>
  );
}
