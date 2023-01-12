import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BASE_URL } from '../utils/constants';
import { getIdFromKey } from '../utils/common';
import { useAppStore } from '../store/store';

import search from '../images/search.png';
import refresh from '../images/refresh.png';

export const Search = () => {
  const router = useRouter();
  const [timer, setTimer] = React.useState(null);
  const [isEmpty, setEmpty] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const { setItems } = useAppStore();

  const handleSearch = async (title) => {
    setLoading(true);

    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/api/search`, {
      params: {
        title,
        limit: 100,
        titleType: 'movie',
      },
    });

    if (results?.length) {
      const ids = results.map(({ id }) => id);

      setItems({ data: ids });
      router.push(`${BASE_URL}/${getIdFromKey(ids[0])}`);
    }

    setEmpty(!results.length);
    setLoading(false);
  };

  const handleChange = ({ target: { value } }) => {
    if (isLoading) return;

    setValue(value);
    clearInterval(timer);

    if (value) {
      setTimer(
        setTimeout(() => {
          handleSearch(value);
        }, 1000),
      );
    }
  };

  return (
    <form>
      <div className="search">
        <input
          type="text"
          name="title"
          placeholder="Search a movie..."
          value={value}
          onChange={handleChange}
        />

        <Image className={`icon ${isLoading ? "loading" : ''}`} src={false ? search : refresh} alt="" width={14} heigh={14} />
        {isEmpty && <div className="tooltip">No results.</div>}
      </div>
    </form>
  );
};
