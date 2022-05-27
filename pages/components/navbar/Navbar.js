import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import styles from '../../../styles/navbar.module.css';

export const siteTitle = 'Games List Web Page';

const Navbar = () => {

    const router = useRouter();
    const { user,setAuth } = useAuth();

    const logout = async() => {
        const res = await axios.get(
            'http://localhost:5000/api/auth/logout/',
            {
                withCredentials:true,
            }
        );
        console.log(res.data);
        setAuth(false);

        router.push('/auth/Login')
    }

    return (
      <div>
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
              <Link href="/profile">
                <a>Welcome, {user}</a>
              </Link>
            </li>
            <li>
              <button type="button" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
}


export default Navbar;