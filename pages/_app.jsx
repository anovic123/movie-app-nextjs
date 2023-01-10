import { Footer } from '../components';
import '../styles/main.css';
import '../styles/globals.css';
import styles from '../styles/Home.module.css';

export default function App({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
