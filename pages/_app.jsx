import axios from 'axios';
import NextNProgress from 'nextjs-progressbar';
import { BASE_URL } from '../utils/constants';
import { Footer } from '../components';

import '../styles/main.css';
import '../styles/globals.css';
import styles from '../styles/Home.module.css';
import { useAppStore } from '../store/store';
import { useEffect } from 'react';

function App({ Component, pageProps }) {
  const { setItems, items } = useAppStore();

  useEffect(() => {
    if (!items.length) {
      setItems(pageProps.data);
    }
  }, [pageProps.data, setItems, items]);

  return (
    <div className={styles.container}>
      <NextNProgress />
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

App.getInitialProps = async ({ Component }) => {
  const pageProps = Component.getInitialProps;

  const { data } = await axios.get(`${BASE_URL}/api/movies`);

  return { pageProps: { ...pageProps, data } };
};

export default App;
