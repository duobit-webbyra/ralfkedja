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
        <div style={{ height: '32px', width: '32px' }}>
          <Leaf />
        </div>
        <h3>{heading}</h3>
      </div>
      <p>{description}</p>
    </div>
  );
}
