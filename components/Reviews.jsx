import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { getIdFromKey } from '../utils/common';

import styles from '../styles/Reviews.module.css';

export const Reviews = ({ id }) => {
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await axios.get(`${BASE_URL}/api/reviews?id=${getIdFromKey(id)}`);

      setReviews(data.reviews);
    };

    fetchReviews();
  }, [id]);

  if (!reviews.length) return 'loading...';

  return (
    <div className={styles.list}>
      <h2>Reviews</h2>

      {reviews?.length ? (
        <div className={styles.container}>
          <div className={styles.reviews}>
            {reviews.map(
              ({
                author: { displayName, userId },
                authorRating,
                reviewText,
                reviewTitle,
                submissionDate,
              }) => (
                <div className={styles.review} key={userId}>
                  <div className={styles.user}>
                    <div className={styles.header}>
                      <div className={styles.author}>{displayName}</div>
                      <div className={styles.date}>{submissionDate}</div>
                    </div>

                    {authorRating && (
                      <div className={styles.rating}>
                        <span>{authorRating}</span> / 10
                      </div>
                    )}
                  </div>

                  <div className={styles.content}>
                    <div className={styles.title}>{reviewTitle}</div>
                    <Text text={reviewText} />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      ) : (
        'No reviews yet.'
      )}
    </div>
  );
};

const Text = ({ text }) => {
  const isFull = text.length < 300;
  const fullText = !isFull ? `${text.slice(0, 300)}` : text;

  return (
    <>
      <div className={styles.text}>
        {fullText}
        {isFull && (
          <div className={styles.more} onClick={handleClick}>
            Read more...
          </div>
        )}
      </div>
    </>
  );
};