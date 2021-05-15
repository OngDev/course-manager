import React from 'react';
import styles from './index.module.css';
import { TEST_VIDEO } from '@constants/videos';
import VideoViewer from '@components/Video/VideoViewer';
export default function() {
  return (
    <div className={styles.normal}>
      <VideoViewer urlVideo={TEST_VIDEO} />
    </div>
  );
}
