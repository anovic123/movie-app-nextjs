import { request } from '../../utils/common';

export default async function handler(req, res) {
  try {
    const { type } = req.query;
    const { data } = await request({
      url: `title/v2/get-popular-movies-by-genre`,
      params: {
        genre: type,
      },
    });

    if (data) res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(`Error during fetching movie cast`);
  }
}
