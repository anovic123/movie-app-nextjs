import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Reviews, Cast } from './';
import { convertDuration, getIdFromKey, getRandom } from '../utils/common';
import { BASE_URL } from '../utils/constants';
import { useAppStore } from '../store/store';

import movieImg from '../images/default-movie.jpg';
import styles from '../styles/Movie.module.css';

export const MovieItem = ({
  id,
  title: { title, image, year, runningTimeInMinutes: duration },
  ratings: { rating },
  plotSummary: plot,
  plotOutline: shortPlot,
  genres,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const { setItems } = useAppStore();
  const [isLoading, setLoading] = React.useState(false);

  const getByGenre = async (genre) => {
    if (isLoading) return;

    setLoading(true);

    const type = genre.replaceAll(' ', '-').toLowerCase();
    const { data } = await axios.get(`${BASE_URL}/api/genres?type=${type}`);

    const random = getRandom(data?.length);
    const id = getIdFromKey(data[random]);

    router.push(`${BASE_URL}/${id}`).then(() => setLoading(false));

    setItems({data});
  };

  return (
    <div className={styles.movie}>
      <div className={styles.title}>
        <h1 className={styles.h1}>{title}</h1>
        {rating && (
          <div className={styles.rating}>
            <span>IMDb</span> {rating}
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.image}>
          <Image
            src={image ? image.url : movieImg}
            alt={title}
            width={'600'}
            height={'600'}
            quality="0.5"
          />
        </div>

        <div className={styles.info}>
          <div className={styles.about}>
            {year && <div className={styles.year}>{year}</div>}
            {duration && <div className={styles.duration}>{convertDuration(duration)}</div>}
          </div>

          <div className={styles.plot}>{plot?.text || shortPlot?.text}</div>

          <div className={styles.genres}>
            {genres.map((genre) => (
              <div key={genre} className={styles.genre} onClick={() => getByGenre(genre)}>
                {genre}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          <Cast id={id} />
          <Reviews id={id} />
        </>
      )}

      <div className={styles.more} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Hide info' : 'View more info'}
      </div>
    </div>
  );
};
