import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { BASE_URL } from '../utils/constants';
import { getIdFromKey } from '../utils/common';

import styles from '../styles/Cast.module.css';

export const Cast = ({ id }) => {
  const [cast, setCast] = React.useState([]);

  React.useEffect(() => {
    const fetchCast = async () => {
      const { data } = await axios.get(`${BASE_URL}/api/cast?id=${getIdFromKey(id)}`);

      setCast([...data.cast.slice(0, 7)]);
    };

    fetchCast();
  }, [id]);

  if (!cast.length) return 'loading...';

  return (
    <div className={styles.cast}>
      <h2 className={styles.heading}>Cast</h2>

      <div className={styles.list}>
        {cast.map(({ characters, id, image, name }) => (
          <Link href={`${BASE_URL}/actor/${getIdFromKey(id)}`} key={id} legacyBehavior>
            <a className={styles.item}>
              <div className={styles.image} style={{ backgroundImage: `url(${image?.url})` }} />

              <div className={styles.info}></div>
              <div className={styles.name}>{name}</div>

              {characters?.length && <div className={styles.character}>{characters.join(',')}</div>}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};