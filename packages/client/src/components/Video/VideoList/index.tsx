import React from 'react'
import VideoItem from '../VideoItem'
import style from './../../../styles/video.css';

const VideoList = () => {
    return (
        <div className={style.videoList}>
            {
                new Array(5).fill({
                    username: 'Dianne Edwards',
                    subname: '@dianneed',
                    avatar: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 50)}`,
                    backgroundVideo: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 50)}`,
                    time: '81 min',
                    desc: 'Learning how to create simple Swift applications in 8 lessons'
                }).map(({ username, subname, avatar, backgroundVideo, time, desc }) => (
                    <VideoItem 
                        username={username} 
                        subname={subname} 
                        avatar={`https://picsum.photos/200/300?random=${Math.floor(Math.random() * 50)}`} 
                        backgroundVideo={`https://picsum.photos/200/300?random=${Math.floor(Math.random() * 50)}`} 
                        time={time} 
                        desc={desc} 
                    />
                ))
            }
        </div>
    )
}

export default VideoList
