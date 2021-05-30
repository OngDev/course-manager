import React from 'react';
import style from '../index.module.css';

const CourseAuthor = () => {
  return (
    <div className={style.courseAuthorWrap}>
      <h2>Simple Swift App</h2>
      <div className={style.courseAuthorTitle}>Author</div>
      <div className={style.courseAuthorUser}>
        <img src="https://picsum.photos/200/300?random=2" alt="user" />
        Dianne Edwards
      </div>
      <div className={style.courseAuthorTitle}>Description</div>
      <p className={style.courseAuthorDesc}>
        In this lesson, you use navigation controllers and segues to create the
        navigation flow of the FoodTracker app. At the end of the lesson, you’ll
        have a complete navigation scheme and interaction flow for the app.
      </p>
    </div>
  );
};

export default CourseAuthor;
