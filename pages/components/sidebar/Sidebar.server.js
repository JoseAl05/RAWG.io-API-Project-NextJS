import styles from '../../../styles/sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faFilter } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    return (
      <>
        <div className={styles.area}></div>
        <nav className={styles.main_menu}>
            <ul>
                <li>
                <a href="#">
                    <FontAwesomeIcon icon={faHome} className={`${styles.fa} ${styles.fa_2x}`} color='white'/>
                    <span className={styles.nav_text}>Dashboard</span>
                </a>
                </li>
                <li className="has-subnav">
                <a href="#">
                    <FontAwesomeIcon icon={faFilter} className={`${styles.fa} ${styles.fa_2x}`} color='white'/>
                    <span className={styles.nav_text}>Filters</span>
                </a>
                </li>
            </ul>
        </nav>
      </>
    );
}

export default Sidebar;