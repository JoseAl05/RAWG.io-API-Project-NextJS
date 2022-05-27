import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <div className={styles.disclaimer} role="disclaimer">
          <small>
            <FontAwesomeIcon icon={faExclamationCircle} className={styles.exclamation} fixedWidth/>
            The content of this website is completely free of charge. The data found here is not mine, but is provided by
            <a href='https://rawg.io/' target='_blank' rel='noreferrer'> RAWG</a>
          </small>
        </div>
        <div className={styles.container}>
          <h1 className={styles.page_title}>
            GameIst Base
          </h1>
          <p className={styles.slogan}>Video Game database and game discovery web page.</p>
          <Link href='/dashboard/1'><a className={styles.button}>Discover Games!</a></Link>
        </div>
        <div className={`${styles.container} ${styles.rawg_container}`}>
          <h1 className={`${styles.title} ${styles.rawg_title}`}>
            RAWG
          </h1>
          <p className={styles.slogan}>
            All data found here is provided by RAWG.
            RAWG is the largest video game database and game discovery service.
            They share 500,000+ games, search, and machine learning recommendations with the world.
          </p>
          <a href='https://rawg.io/apidocs' className={styles.button} target='_blank' rel="noreferrer">About RAWG.!</a>
        </div>
        <div className={styles.container}>
          <h1 className={`${styles.title} ${styles.footer}`}>
            © All rights reserved.
          </h1>
        </div>
      </div>
    </>
  );
}
