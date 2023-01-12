import axios from 'axios';
import { useEffect } from 'react';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { BASE_URL } from '../utils/constants';
import { Footer } from '../components';
import { useAppStore } from '../store/store';

import '../styles/main.css';
import '../styles/globals.css';
import styles from '../styles/Home.module.css';

function App({ Component, pageProps }) {
  const { setItems, items } = useAppStore();

  useEffect(() => {
    if (!items?.length) {
      setItems(pageProps.data);
    }
  }, [pageProps.data, setItems, items]);

  return (
    <div className={styles.container}>
      <Head>
        <title>The best movie APP</title>
        <meta name="description" content="Movie app" />
      </Head>
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
