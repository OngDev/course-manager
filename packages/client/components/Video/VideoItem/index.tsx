import { IVideo } from '@interfaces/video';
import React from 'react'
import style from '@styles/video.module.css';

const VideoItem: React.FC<IVideo> = ({username, subname, avatar, backgroundVideo, time, desc}) => {
    return (
        <div className={style.video} style={{background: `url(${backgroundVideo})`}}>
            <div className={style.videoHeader}>
                <div className={style.videoHeaderInfor}>
                    <img src={avatar} alt="user" className={style.avatar} />
                    <div className="txt">
                        <div className={style.name}>{username}</div>
                        <p className={style.subname}>{subname}</p>
                    </div>
                </div>

                <span className={style.time}>{time}</span>
            </div>

            <div className={style.desc}>{desc}</div>
        </div>
    )
}

export default VideoItem
