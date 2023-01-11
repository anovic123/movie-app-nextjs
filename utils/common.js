import axios from 'axios';

export const request = async ({ url, params }) => {
  const options = {
    method: 'GET',
    url: `https://imdb8.p.rapidapi.com/${url}`,
    params: {
      ...params,
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_API_KEY,
      'X-RapidAPI-Host': process.env.NEXT_PUBLIC_API_HOST,
    },
  };

  const data = await axios.request(options);
  return data;
};

export const getIdFromKey = (str) => str.split('/')[2];

export const convertDuration = (total) => {
  const minutes = total % 60;
  const hours = Math.floor(total / 60);

  return `${hours}h ${minutes}m`;
};
