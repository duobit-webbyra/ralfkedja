import React from 'react';
import CourseForm from './course-form';
import Title from '../utils/title';
import style from './course-registration.module.scss';
export default function CourseRegistration() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.text}>
          <Title
            heading='Kurser'
            subHeading='Delta i kommande kurser!'
            description='Är du intresserad av att lära dig mer om biomagnetism, kinesiologi eller Touch for Health? Fyll i formuläret för att göra en intresseanmälan och få uppdateringar om när nästa kurs startar. Oavsett om du är nybörjare eller vill fördjupa dina kunskaper, är kurserna utformade för att ge dig praktisk förståelse och färdigheter inom dessa områden.'
            left
          />
        </div>
        <div className={style['contact-form-container']}>
          <CourseForm layout='flex' />
        </div>
      </div>
    </div>
  );
}
