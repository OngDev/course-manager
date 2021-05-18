import React, { useEffect, useState } from 'react';
import style from '@styles/video.module.css';
import VideoItem from '../VideoItem';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/api/videos')
      .then(res => res.json())
      .then(data => {
        setVideos(data.videos);
      });
  }, []);
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
              avatar={`https://picsum.photos/200/300?random=${Math.floor(
                Math.random() * 50
              )}`}
              backgroundVideo={`https://picsum.photos/200/300?random=${Math.floor(
                Math.random() * 50
              )}`}
              time={time}
              desc={desc}
            />
          )
        )}
    </div>
  );
};

export default VideoList;
