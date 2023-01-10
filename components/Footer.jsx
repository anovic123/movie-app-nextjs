import React from 'react';

import styles from '../styles/Home.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <span>Created by </span>
        <a href="https://github.com/anovic123" target="_blank" rel="noopener noreferrer">
          Anovic123
        </a>
      </div>
    </footer>
  );
};
