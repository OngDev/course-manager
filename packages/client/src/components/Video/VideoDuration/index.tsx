import React, { useEffect, useState } from 'react';
import style from './../../../styles/video.css';

interface IProps {
    videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoDuration: React.FC<IProps> = ({ videoRef }) => {
    const [percent, setPercent] = useState<string>('0%');

    const [currentTime, setCurrentTime] = useState(0);
    const [currentMinutes, setCurrentMinutes] = useState(0);
    const [currentHourse, setCurrentHourse] = useState(0);

    const [duration, setDuration] = useState(0);
    const [durationMinutes, setDurationMinutes] = useState(0);
    const [durationtHourse, setDurationtHourse] = useState(0);

    const getTimeVideo = (type: 'duration' | 'current') => {
        const isDuration = (type === 'duration');
        const hourse = isDuration ? durationtHourse : currentHourse;
        const minutes = isDuration ? durationMinutes : currentMinutes;
        const milliseconds = isDuration ? duration : currentTime;
        return convertTime(hourse) + ':' + convertTime(minutes) + ':' + convertTime(milliseconds);
    }

    const convertTime = (time: string | number) => {
        const newTime = typeof time === 'string' ? parseInt(time) : time;
        return newTime < 10 ? '0' + time.toString() : time;
    }

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener('timeupdate', () => {
                setCurrentTime(Math.floor(video.currentTime));
                setCurrentMinutes(Math.floor(video.currentTime / 60));
                setCurrentHourse(Math.floor(video.currentTime / (60 * 60)));
                setPercent(((video.currentTime / video.duration) * 100) + '%');
            });
            video.onloadedmetadata = () => {
                setDuration(Math.floor(video.duration));
                setDurationMinutes(Math.floor(video.duration / 60));
                setDurationtHourse(Math.floor(video.duration / (60 * 60)));
            }
        }
    }, [videoRef]);

    return (
        <div className={style.Duration}>
            <div className={style.Time} style={{width: percent}}>
                <span>{getTimeVideo('current')} / {getTimeVideo('duration')}</span>
            </div>
        </div>
    )
}

export default VideoDuration;
