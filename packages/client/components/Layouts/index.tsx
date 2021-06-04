import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import HeaderComponent from './Header'
import SidebarComponent from './Sidebar'
import styles from './index.module.css'
import { DOTS as DotsIcon } from '@constants/icons'
import LoginModal from '@components/Login';
import Register from '@components/Register';
import { Profile } from 'types';
import { axios, setUpdateLoginState } from 'utils/axios';

interface Layout {
  isWide: boolean
  children: JSX.Element
  title?: string
}
type ModalType = 'login' | 'register' | 'none';
export enum ModalTypeEnum {
  Login= 'login',
  Register= 'register',
  None= 'none'
};

function Layout({ children, isWide, title }: Layout) {
  const [modalType, setModalType] = useState<ModalType>(ModalTypeEnum.None);
  const [profile, setProfile] = useState<null | Profile>(null);
  setUpdateLoginState((newProfile: null | Profile) => {
    setProfile(newProfile);
    // localStorage.setItem('email', newProfile?.email || '');
    // localStorage.setItem('username', newProfile?.username || '');
  });
  useEffect(() => {
    (async function() {
      try {
        await axios.get('/auth/profile');
      } catch (error) {
        // ignore
      }
    })();
  }, []);
  const toggleModal = (type: ModalType) => {
    console.log()
    setModalType(type);
  }
  return (
    <>
    {modalType===ModalTypeEnum.Register && <Register toggleModal={toggleModal}/> }
    {modalType===ModalTypeEnum.Login && <LoginModal toggleModal={toggleModal}/> }
    <div className={styles.container}>
      <SidebarComponent isWide={isWide}></SidebarComponent>
      <section className={styles.main}>
        <HeaderComponent profile={profile} toggleModal={toggleModal}></HeaderComponent>
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
    </>
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