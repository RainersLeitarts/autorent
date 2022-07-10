import React from 'react'
import styles from '../styles/Navbar.module.css'
import Link from 'next/link'

const Navbar = () => {

  const Logo = () => {
    return (
      <h1 className={styles.logo}>VZ</h1>
    )
  }

  const MobileIcon = () => {
    return (
      <div className={styles.mobileIcon}>
        
      </div>
    )
  }

  const Links = () => {
    return (
      <div className={styles.linksContainer}>
        <Link href={'/'}>
          <a className={styles.navlink}>Auto Noma</a>
        </Link>
        <Link href={'/'}>
          <a className={styles.navlink}>Peikabju Noma</a>
        </Link>
        <Link href={'/'}>
          <a className={styles.navlink}>Kontakti</a>
        </Link>
        <Link href={'/'}>
          <a className={styles.navlink}>Par Mums</a>
        </Link>
        <MobileIcon />
      </div>
    )
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.navContent}>
        <Logo />
        <Links />
      </div>
    </div>
  )
}

export default Navbar