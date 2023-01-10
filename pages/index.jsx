import Image from 'next/image';
import { Inter } from '@next/font/google';
import update from '../images/refresh.png';

import styles from '../styles/Index.module.css';

export default function Home() {
  return (
    <div className={styles.wrap}>
      <div className={styles.image} />
      <h1 className={styles.title}>Welcome to Movie App</h1>
      <div className={styles.subtitle}>
        The best movie of the Galaxy to help you find a movie tonight.
      </div>

      <div className={`update ${styles.update}`}>
        <Image className="icon" src={update} alt="" width={14} height={14} />
        <span>Get a movie</span>
      </div>
    </div>
  );
}
