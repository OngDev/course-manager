import React, { useEffect, useRef, useState } from 'react';
import style from './../../../styles/video.css';

interface IProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    endVideo: () => void;
}

const VideoDuration: React.FC<IProps> = ({ videoRef, endVideo }) => {
    const [percent, setPercent] = useState<string>('0%');

    const [currentSeconds, setCurrentSeconds] = useState(0);

    const [durationSeconds, setDurationSeconds] = useState(0);

    const barRef = useRef<any>(null)

    const convertSecondsToTime = (seconds: number) => {
        let time = '00:00:00';

        if (seconds) {
            time = new Date(seconds * 1000).toISOString().substr(11, 8);
        }

        return time;
    }

    const selectTime = (event: React.MouseEvent<HTMLDivElement>) => {
        const bar = barRef.current;
        const video = videoRef.current;
        if (bar && video) {
            const progressTime = (event.nativeEvent.offsetX / bar.offsetWidth) * video.duration;
            video.currentTime = progressTime;
        }
    }

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener('timeupdate', () => {
                setCurrentSeconds(Math.floor(video.currentTime));
                setPercent(((video.currentTime / video.duration) * 100) + '%');
                if (video.currentTime === video.duration) {
                    endVideo();
                }
            });
            video.onloadedmetadata = () => {
                setDurationSeconds(Math.floor(video.duration));
            }
        }

        return video?.removeEventListener('timeupdate', () => {});
    }, [endVideo, videoRef]);

    return (
        <div className={style.Duration} onClick={selectTime} ref={barRef}>
            <div className={style.Time} style={{width: percent}}>
                <span>{convertSecondsToTime(currentSeconds)} / {convertSecondsToTime(durationSeconds)}</span>
            </div>
        </div>
    )
}

export default React.memo(VideoDuration);
