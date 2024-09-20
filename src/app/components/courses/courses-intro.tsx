import React from 'react';
import Title from '../utils/title';
import style from './courses-intro.module.scss';
export default function CoursesIntro() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <Title
          heading='Kurser'
          subHeading='Var med på nästa kurs!'
          description='Här kan du intresseanmäla dig för kommande kurser!'
          left
        />
      </div>
    </div>
  );
}
