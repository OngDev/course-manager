import React from 'react'
import style from './Siderbar.module.css';
import icon_home from './../../assets/icon/home.png';
import icon_progress from './../../assets/icon/progress.png';
import icon_messages from './../../assets/icon/messages.png';
import icon_setting from './../../assets/icon/setting.png';
import icon_logout from './../../assets/icon/logout.png';

interface SiderBarProps {
  active: boolean;
}
const SiderBar: React.FC<SiderBarProps> = ({ active }) => {

  const menu = [
    { id: "01", name: "Home", url: "/", icon: icon_home },
    { id: "02", name: "Progress", url: "/", icon: icon_progress },
    { id: "03", name: "Message", url: "/", icon: icon_messages },
    { id: "04", name: "Setting", url: "/", icon: icon_setting },
    { id: "05", name: "Logout", url: "/", icon: icon_logout }
  ]

  return (
    <div className={style.NavBar}>
      <div className={style.Header}>
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="img_avatar" className={style.avatar} />
        <p className={`${style.name} ${active ? `` : `${style.hide}`}`}> Course Manager</p>
      </div>

      <div className={style.Menu}>
        {menu.length && menu.map((item, index) => (
          <a key={index} className={style.link}>
            <img src={item.icon} alt={`icon_${item.name}`} className={style.iconLink} />
            <span className={`${active ? `` : `${style.hide}`}`}>{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default SiderBar;
