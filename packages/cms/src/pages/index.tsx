import React from 'react';
import styles from './index.css';

// import { formatMessage } from 'umi-plugin-locale';
import Cms from './cms/cms';
export default function () {
  return (
    <div className={styles.normal}>
      <Cms />
    </div>
  );
}
