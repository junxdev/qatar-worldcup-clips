import { NextApiHandler } from "next";

const url =
  "https://api-gw.sports.naver.com/video/lists/total?upperCategoryId=event&categoryId=qatar2022&sort=date&themeType=type&themeCode=2&fields=worldcup";

const handler: NextApiHandler = async (req, res) => {
  const { page, pageSize } = req.query;
  const result = await getVideos({
    page: page as string,
    pageSize: pageSize as string,
  });
  res.status(200).json(result);
};

export default handler;

interface GetVideosParams {
  page?: number | string;
  pageSize?: number | string;
}

export async function getVideos({
  page = 1,
  pageSize = 20,
}: GetVideosParams): Promise<any> {
  return fetch(`${url}&page=${page}&pageSize=${pageSize}`).then((response) =>
    response.json()
  );
}
