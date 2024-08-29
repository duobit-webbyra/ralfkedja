import style from './treatment-item.module.scss';

interface TreatmentItemProps {
  heading: string;
  description: string;
}

export default function TreatmentItem({ heading, description }: TreatmentItemProps) {
  return (
    <div className={style.container}>
      <h3>{heading}</h3>
      <p>{description}</p>
    </div>
  );
}
