import React from 'react';
import styles from './index.css';
import Video from './../assets/videos/pexels-taryn-elliott-5699107.mp4';
import VideoViewer from '@/components/Video/VideoViewer';
export default function() {
  return (
    <div className={styles.normal}>
      <VideoViewer urlVideo={Video} />
    </div>
  );
}
