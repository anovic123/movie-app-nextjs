import React from 'react';
import Image from 'next/image';
import { useAppStore } from '../store/store';
import { useRouter } from 'next/router';
import { BASE_URL } from '../utils/constants';
import { getIdFromKey, getRandom } from '../utils/common';

import update from '../images/refresh.png';

export const GetButton = ({ text = 'Get a movie', cn = '' }) => {
  const router = useRouter();
  const { items } = useAppStore();
  const { id } = router.query;

  const getMovie = () => {
    if (!items.length) return;

    const filtered = items.filter((item) => getIdFromKey(item) !== id);

    if (filtered.length) {
      const random = getRandom(filtered.length);
      const newId = getIdFromKey(filtered[random]);
      router.push(`${BASE_URL}/${newId}`);
    }
  };

  return (
    <div className={`update ${cn}`} onClick={getMovie}>
      <Image className="icon" src={update} width={14} height={14} alt="" />
      <span>{text}</span>
    </div>
  );
};
