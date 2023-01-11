import React from 'react';
import Image from 'next/image';
import { useAppStore } from '../store/store';
import { useRouter } from 'next/router';
import { BASE_URL } from '../utils/constants';
import { getIdFromKey } from '../utils/common';

import update from '../images/refresh.png';

export const GetButton = ({ text = 'Get a movie', cn = '' }) => {
  const router = useRouter();
  const { items } = useAppStore();

  const getMovie = () => {
    if (!items.length) return;

    router.push(`${BASE_URL}/${getIdFromKey(items[0])}`);
  };

  return (
    <div className={`update ${cn}`} onClick={getMovie}>
      <Image className="icon" src={update} width={14} height={14} alt="" />
      <span>{text}</span>
    </div>
  );
};
