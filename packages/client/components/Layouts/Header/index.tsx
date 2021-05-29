import React from 'react'
import styles from './index.module.css'
import { PROFILE as ProfileIcon, SEARCH as SearchIcon } from '@constants/icons'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapperHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.search}>
            <div className={styles.searchIcon}>
              <img src={SearchIcon} alt="search-icon" />
            </div>
            <input className={styles.searchInput} type="text" placeholder="Search..." />
          </div>
        </div>
        <div className={styles.headerRight}>
          <ul className={styles.icons}>
            <li>
              <a href="#">
                <img src={ProfileIcon} alt="icon" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}