import React from 'react';
import Link from 'next/link';
import styles from '../../../styles/navbar.module.css';


const NotAuthNavbar = () => {

    return (
      <section>
        <div className={styles.custom_nav}>
          <ul className={styles.navbar_menu_left}>
            <li>
              <Link href="/">
                <a>Games List</a>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/1">
                <a>Explore Games!</a>
              </Link>
            </li>
          </ul>
          <ul className={styles.navbar_menu_right}>
            <li>
              <Link href="/auth/Register">
                <a>Sign Up</a>
              </Link>
            </li>
            <li>
              <Link href="/auth/Login">
                <a>Sign In</a>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    );
}

export default NotAuthNavbar;