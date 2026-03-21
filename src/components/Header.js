import React from 'react'
import { Link, withPrefix } from 'gatsby'
import * as styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <img src={withPrefix('/logo.svg')} alt="Leadcase" className={styles.logoMark} />
          Leadcase
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink} activeClassName={styles.navLinkActive}>
            Library
          </Link>
          <Link to="/about" className={styles.navLink} activeClassName={styles.navLinkActive}>
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
