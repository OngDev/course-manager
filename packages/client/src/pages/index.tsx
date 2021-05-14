import React from 'react';
import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
import VideoViewer from '@/components/Video/VideoViewer';
export default function() {
  return (
    <div className={styles.normal}>
      <VideoViewer />
    </div>
  );
}
