import React from 'react';
import DefaultHero from '@/app/components/hero/default-hero';
import CourseRegistration from '@/app/components/courses/course-registration';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ralf Kedja | Kurser',
  description: 'Här kan du intresseanmäla dig för kommande kurser!',
};
export default function Page() {
  return (
    <>
      <DefaultHero title='Kurser' />
      <section
        style={{
          paddingBlock: '4rem',
        }}
      >
        <CourseRegistration />
      </section>
    </>
  );
}
