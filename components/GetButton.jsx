import React from 'react';
import Image from 'next/image';

import update from '../images/refresh.png';
import { useAppStore } from '../store/store';

export const GetButton = ({ text = 'Get a movie', cn = '' }) => {
  const { items } = useAppStore();

  const getMovie = () => {
    if(!items.length) return;

    
  }

  return (
    <div className={`update ${cn}`} onClick={getMovie}>
      <Image className="icon" src={update} width={14} height={14} alt="" />
      <span>{text}</span>
    </div>
  );
};
