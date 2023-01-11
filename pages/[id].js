import axios from 'axios';
import { GetButton, MovieItem } from '../components';
import { BASE_URL } from '../utils/constants';

export default function Movie({ movie }) {
  return (
    <>
      <GetButton />
      <MovieItem {...movie} />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${BASE_URL}/api/movie?id=${query.id}`);

  return {
    props: {
      movie: data,
    },
  };
}
