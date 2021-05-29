import React, { useState } from 'react';
import style from '@styles/Video.module.css';
import VideoItem from '../VideoItem';
import courses from './courses'

const VideoList = () => {
  const [videos] = useState(courses);
  return (
    <div className={style.videoList}>
      {videos.length > 0 &&
        videos.map(
          (
            { username, subname, avatar, backgroundVideo, time, desc },
            index
          ) => (
            <VideoItem
              key={index}
              username={username}
              subname={subname}
              avatar={`https://picsum.photos/200/300?v=${index}`}
              backgroundVideo={`https://picsum.photos/200/300?v=${index}`}
              time={time}
              desc={desc}
            />
          )
        )}
    </div>
  );
};

export default VideoList;
