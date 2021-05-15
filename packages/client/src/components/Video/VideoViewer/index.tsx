import React, { useRef, useState } from 'react';
import Start from './../../../assets/icons/start.svg';
import Stop from './../../../assets/icons/stop.svg';
import Hd from './../../../assets/icons/hd.svg';
import Volume from './../../../assets/icons/volume.svg';
import VolumeMute from './../../../assets/icons/volume-x.svg';
import Zoom from './../../../assets/icons/zoom.svg';
import Video from './../../../assets/videos/pexels-taryn-elliott-5699107.mp4';
import style from './../../../styles/video.css';
import VideoDuration from '../VideoDuration';

const SpeedOptions = ['0.5', '1.0', '1.5'];

const VideoViewer: React.FC = () => {
    const [isSpeed, setIsSpeed] = useState(false);
    const [isStartVideo, setIsStartVideo] = useState(false);
    const [isVolumeMute, setIsVolumeMute] = useState(false);
    const [speed, setSpeed] = useState(SpeedOptions[1]);
    const videoRef = useRef<any>(null);

    const startVideo = () => {
        const video = videoRef.current;
        setIsStartVideo(!isStartVideo);
        if (video) {
            if(video.paused) video.play(); 
            else video.pause();
        }
    }

    const toggleVolume = () => {
        const video = videoRef.current;
        if(video) {
            video.muted = !video.muted;
            setIsVolumeMute(!isVolumeMute);
        }
    }

    const openFullscreen = () => {
        const video = videoRef.current;
        if (video) {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }    
        }
    }

    const setPlaySpeed = (speed: string) => {
        const video = videoRef.current;

        if (video) {
            setSpeed(speed);
            video.playbackRate = speed;
        }
    }

    return (
        <div className={style.VideoDetailWrapper}>
            <video className={style.VideoDetail} src={Video} ref={videoRef}></video>
            <div className={style.Control}>
                <span onClick={startVideo}><img src={isStartVideo ? Stop : Start} alt="start" /></span>
                <span className="speed" onClick={() => setIsSpeed(!isSpeed)}>
                    {speed}x
                    {
                        isSpeed && (
                            <ul className={style.SpeedOptions}>
                                {SpeedOptions.map(speed => <li key={speed} onClick={() => setPlaySpeed(speed)}>{speed}x</li>)}
                            </ul>        
                        )
                    }
                </span>
                <VideoDuration videoRef={videoRef} />
                <span onClick={toggleVolume}><img src={isVolumeMute ? VolumeMute : Volume} alt="volume" /></span>
                <span><img src={Hd} alt="hd" /></span>
                <span><img src={Zoom} alt="zoom" onClick={openFullscreen} /></span>
            </div>
        </div>
    )
}

export default VideoViewer;

