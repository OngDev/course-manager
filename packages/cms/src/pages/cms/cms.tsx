import React, { useState } from 'react';
import styles from './cms.module.css';

import SiderBar from '@/components/SiderBar/SiderBar';
import CreateCrourse from '../CreateCourse/CreateCourse';

const Cms = () => {
  const [active, setActive] = useState(false);
  const handleActive = () => {
    setActive(!active);
  }

  return (
    <div className={styles.cms}>
      <div className={`${styles.siderbar} ${active ? `${styles.siderbar__full}` : `${styles.siderbar__small}`}`}>
        <SiderBar active={active} />
      </div>
      <div className={`${styles.content} ${active ? `${styles.content__full}` : `${styles.content__small}`} `} >
        <div className={styles.hamburger} onClick={handleActive}>
          <span className={`${styles.line} ${active ? `` : `${styles.active}`} `}></span>
          <span className={`${styles.line} ${active ? `` : `${styles.active}`} `}></span>
          <span className={`${styles.line} ${active ? `` : `${styles.active}`} `}></span>
        </div>
        {/* <SearchBar /> */}
        {/* <Tables /> */}
        <CreateCrourse />
      </div>
    </div>
  );
}
export default Cms;
