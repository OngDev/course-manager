import React from 'react';
import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
import VideoList from '@/components/Video/VideoList';
export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <VideoList />
    </div>
  );
}
