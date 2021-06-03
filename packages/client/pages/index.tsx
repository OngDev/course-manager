import React, { Fragment } from 'react';
import Layout from '@components/Layouts'
import CourseList from '@components/Video/VideoList'
import LoginModal from '@components/Login';
//import Register from '@components/Register';

export default function Home() {
  return (
    <Fragment>
      {/* <Register /> */}
      <LoginModal />
      <Layout title="Courses">
        <div>
          <CourseList />
        </div>
      </Layout>
    </Fragment>
  );
}
