import React from 'react';
import { TEST_VIDEO } from '@constants/videos';
import VideoViewer from '@components/Video/VideoViewer';
import styles from './index.module.css';

export default function() {
  return (
    <div className={styles.normal}>
      <VideoViewer urlVideo={TEST_VIDEO} />
    </div>
  );
}
