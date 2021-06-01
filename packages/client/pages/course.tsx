import React from 'react';
import { TEST_VIDEO } from '@constants/videos';
import VideoViewer from '@components/Video/VideoViewer';
import styles from './index.module.css';
import Layout from '@components/Layouts'

export default function Course() {
  return (
    <Layout isWide={true} title="Lá đung đưa">
      <div className={styles.normal}>
        <VideoViewer urlVideo={TEST_VIDEO} />
      </div>
    </Layout>
  );
}
