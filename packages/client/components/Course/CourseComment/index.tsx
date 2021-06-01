import { SORT } from '@constants/icons';
import React from 'react';
import CourseCommentItem from '../CourseCommentItem';
import style from '../index.module.css';

const CourseComment = () => {
  return (
    <div>
      <div className={style.courseCommentHeader}>
        <div className={style.courseCommentHeaderComments}>25 Comments</div>
        <div className={style.courseCommentHeaderSort}>
          <img src={SORT} alt="sort" />
          Sort by
        </div>
      </div>

      <div className="course-body">
        <div className={style.courseCommentSearch}>
          <img
            className={style.courseCommentAvatar}
            src="http://yeu16.com/wp-content/uploads/2021/03/top-10-dien-vien-jav-nhat-ban.jpg"
            alt="user"
          />
          <input type="text" placeholder="add a comment..." />
        </div>

        <>
          <CourseCommentItem />
          <CourseCommentItem />
          <CourseCommentItem />
          <CourseCommentItem />
          <CourseCommentItem />
          <CourseCommentItem />
          <CourseCommentItem />
          <CourseCommentItem />
        </>
      </div>
    </div>
  );
};

export default CourseComment;
