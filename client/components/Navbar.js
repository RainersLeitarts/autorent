import React from 'react'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
        <div className={styles.nav_container}>
            <div className={styles.logo}/>
            <div></div>
        </div>
    </div>
  )
}

export default Navbar