import React from 'react';
import style from '../index.module.css';

const CourseLessonItem = () => {
  return (
    <div className={style.courseLessionItem}>
      <div className={style.courseLessionItemChecked} />
      <div className="infor">
        <div className={style.courseLessionItemTitle}>Custom Control</div>
        <div className={style.courseLessionItemLecture}>
          <span>Lesson 1</span>
          <span className={style.Duration}>• 11 min</span>
        </div>
      </div>
    </div>
  );
};

export default CourseLessonItem;
