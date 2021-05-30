import React from 'react';
import style from '../index.module.css';

const CourseSubtitle = () => {
  return (
    <div className={style.courseSubtitle}>
      <ul>
        <li>
          <span className="time">00:00</span>
          <p>Sorry can't answer your call at the moment Sorry can't answer your call at the moment Sorry can't answer your call at the moment Sorry can't answer your call at the moment</p>
        </li>
        <li>
          <span className="time">00:02</span>
          <p>Sorry can't answer your call at the moment</p>
        </li>
        <li>
          <span className="time">00:04</span>
          <p>Sorry can't answer your call at the moment</p>
        </li>
        <li>
          <span className="time">00:06</span>
          <p>Sorry can't answer your call at the moment</p>
        </li>
      </ul>
    </div>
  );
};

export default CourseSubtitle;
