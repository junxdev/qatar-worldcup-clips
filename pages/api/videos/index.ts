import { NextApiHandler } from "next";
import { Video } from "../../../domains/video";
import { videos } from "./data";

const url =
  "https://api-gw.sports.naver.com/video/lists/total?upperCategoryId=event&categoryId=qatar2022&sort=date&themeType=type&themeCode=2&fields=worldcup";

const handler: NextApiHandler = async (req, res) => {
  const { page, pageSize } = req.query;
  const result = await getVideos({
    page: parseInt(page as string),
    pageSize: parseInt(pageSize as string),
  });
  res.status(200).json(result);
};

export default handler;

interface GetVideosParams {
  page: number;
  pageSize: number;
}

export async function getVideos({
  page = 1,
  pageSize = 20,
}: GetVideosParams): Promise<any> {
  return { result: { videos: videos.slice((page - 1) * pageSize, page * pageSize), totalCount: videos.length } };
  // return fetch(`${url}&page=${page}&pageSize=${pageSize}`).then((response) =>
  //   response.json()
  // );
}
