import React from 'react';
import Layout from '@components/Layouts'
import CourseList from '@components/Video/VideoList'

export default function Home() {
  return (
    <Layout title="Courses">
      <div>
        <CourseList/>
      </div>
    </Layout>
  );
}
