import React from 'react'
import styles from '../styles/sidebar.module.css'
import discover from '../images/discover.png'
import home from '../images/home.png'
import library from '../images/library.png'
import Logo from '../images/Logo.png'
import logout from '../images/logout.png'
import settings from '../images/settings.png'
import trends from '../images/trends.png'

const sidebar = () => {
  return (
    <div className={styles.sidebarMain}>
        <div className={styles.sidebarMainTop}>
            <img src={Logo} className={styles.sidebarMainTopLogo}></img>
            <p className={styles.sidebarMainTopDream}>Dream</p><p className={styles.sidebarMainTopMusic}>Music</p>
        </div>
        <div className={styles.sidebarMainMiddle}>
            <p className={styles.sidebarMainMiddleMenu}>MENU</p>
            <div className={styles.sidebarMainMiddleHome}>
                <img src={home}></img>
                <p className={styles.sidebarMainMiddleHomeText}>Home</p>
            </div>
            <div className={styles.sidebarMainMiddleTrends}>
                <img src={trends}></img>
                <p className={styles.sidebarMainMiddleTrendsText}>Trends</p>
            </div>
            <div className={styles.sidebarMainMiddleLibrary}>
                <img src={library}></img>
                <p className={styles.sidebarMainMiddleLibraryText}>Library</p>
            </div>
            <div className={styles.sidebarMainMiddleDiscover}>
                <img src={discover}></img>
                <p className={styles.sidebarMainMiddleDiscoverText}>Discover</p>
            </div>
        </div>
        <div className={styles.sidebarMainBottom}>
            <p className={styles.sidebarMainBottomGeneral}>GENERAL</p>
            <div className={styles.sidebarMainBottomSettings}>
                <img src={settings}></img>
                <p className={styles.sidebarMainBottomSettingsText}>Settings</p>
            </div>
            <div className={styles.sidebarMainBottomLogout}>
                <img src={logout}></img>
                <p className={styles.sidebarMainBottomLogoutText}>Log Out</p>
            </div>
        </div>
    </div>
  )
}

export default sidebar