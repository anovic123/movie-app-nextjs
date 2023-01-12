import axios from 'axios';
import { GetButton, MovieItem, ActorItem } from '../../components';
import { BASE_URL } from '../../utils/constants';

export default function Actor({ actor }) {
  return (
    <>
      {/* <GetButton />
      <MovieItem {...movie} /> */}
      <ActorItem {...actor}/>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${BASE_URL}/api/actor?id=${query.id}`);

  return {
    props: {
      actor: data,
    },
  };
}
