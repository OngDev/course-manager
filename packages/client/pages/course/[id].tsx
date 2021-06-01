import React, { useState } from 'react';
import { TEST_VIDEO } from '@constants/videos';
import { CONTENT, COMMENT, AUTHOR, DISLIKE, LIKE } from '@constants/icons';
import VideoViewer from '@components/Video/VideoViewer';
import style from '@styles/Course.module.css';
import CourseLesson from '@components/Course/CourseLesson';
import CourseComment from '@components/Course/CourseComment';
import CourseAuthor from '@components/Course/CourseAuthor';
import CourseSubtitle from '@components/Course/CourseSubTitle';

const TabTitle: any[] = [CONTENT, COMMENT, AUTHOR];

const CoursePage = () => {
  const [isCurrentTab, setIsCurrentTab] = useState(0);
  return (
    <div className={style.coursePageWrap}>
      <div className={style.courseLeft}>
        <VideoViewer urlVideo={TEST_VIDEO} />
        <div className={style.courseActions}>
          <span>
            <img src={LIKE} alt="" /> 145
          </span>
          <span>
            <img src={DISLIKE} alt="" /> 6
          </span>
        </div>
        <div className={style.courseLanguage}>
          English <span />
        </div>
        <CourseSubtitle />
      </div>
      <div className="tab">
        <ul className={style.tabTitle}>
          {TabTitle.map((title, index) => (
            <li
              className={isCurrentTab === index ? style.tabTitleActive : ''}
              key={`tab-${index}`}
              onClick={() => setIsCurrentTab(index)}
            >
              <img src={title} alt="tab" />
            </li>
          ))}
        </ul>

        <div className={style.tabBody}>
          {isCurrentTab === 0 && <CourseLesson />}
          {isCurrentTab === 1 && <CourseComment />}
          {isCurrentTab === 2 && <CourseAuthor />}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
