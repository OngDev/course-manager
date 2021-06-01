import React from 'react';
import PropTypes from 'prop-types'
import HeaderComponent from './Header'
import SidebarComponent from './Sidebar'
import styles from './index.module.css'
import { DOTS as DotsIcon } from '@constants/icons'

interface Layout {
  isWide: boolean
  children: JSX.Element
  title?: string
}

function Layout({ children, isWide, title }: Layout) {
  return (
    <div className={styles.container}>
      <SidebarComponent isWide={isWide}></SidebarComponent>
      <section className={styles.main}>
        <HeaderComponent></HeaderComponent>
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h2 className={styles.pageTitle}>{title}</h2>
            <div className="action">
              <div className="icon">
                <img src={DotsIcon} alt="icon" />
              </div>
            </div>
          </div>
          <div className="page-content">{children}</div>
        </div>
      </section>
    </div>
  );
}
Layout.defaultProps = {
  isWide: false
}
Layout.propsType = {
  isWide: PropTypes.bool,
  title: PropTypes.string
}

export default Layout