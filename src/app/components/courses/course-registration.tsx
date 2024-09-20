import React from 'react';
import CourseForm from './course-form';
import Title from '../utils/title';
import style from './course-registration.module.scss';
export default function CourseRegistration() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style['text-form-container']}>
          <div className={style.text}>
            <Title
              heading='Kurser'
              subHeading='Var med på nästa kurs!'
              description='Här kan du intresseanmäla dig för kommande kurser i biomagnetism, kinesiologi och Touch for Health!'
            />
          </div>
          <div className={style['contact-form-container']}>
            <div className={style['contact-form']}>
              <CourseForm layout='flex' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
