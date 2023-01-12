import axios from 'axios';
import React from 'react';

import { getIdFromKey } from '../utils/common';
import { BASE_URL } from '../utils/constants';
import { Preloader } from './';

import styles from '../styles/Film.module.css';
import Link from 'next/link';

export const ActorFilms = ({ id }) => {
  const [films, setFilms] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/filmography?id=${getIdFromKey(id)}`);

      const filtered = data.filmography.filter(({ status, titleType }) => {
        return status === 'released' && titleType === 'movie';
      });

      setFilms(filtered.filter((_, i) => i < 20));
      setLoading(false);
    };

    fetchFilms();
  }, [id]);

  return (
    <div className={styles.films}>
      <h2>Filmography</h2>

      <div className={styles.list}>
        {isLoading ? (
          <Preloader />
        ) : (
          films.map(({ characters, id, image, title, year }) => {
            <Link href={`${BASE_URL}/${getIdFromKey(id)}`} key={id}>
              <a className={styles.item}>
                <div className={styles.image} style={{ backgroundImage: `url(${image.url})` }} />
                <div className={styles.info}>
                  <div className={styles.title}>{title}</div>

                  {characters?.length && (
                    <div className={styles.character}>
                      <span>{characters[0]}</span>
                    </div>
                  )}
                  <div className={styles.year}>{year}</div>
                </div>
              </a>
            </Link>;
          })
        )}
      </div>
    </div>
  );
};
