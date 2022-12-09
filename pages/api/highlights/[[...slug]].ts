import { NextApiHandler } from "next";

const streamingURLMap = {
  "/api/highlights/sbs": "https://naver-sbs-h.smartmediarep.com",
  "/api/highlights/kbs": "https://naver-kbs-h.smartmediarep.com",
  "/api/highlights/mbc": "https://naver-mbc-h.smartmediarep.com",
};

const replaceStreamingURL = (url: string) => {
  Object.entries(streamingURLMap).forEach(([origin, api]) => {
    url = url.replace(origin, api);
  });
  return url;
};

const handler: NextApiHandler = async (req, res) => {
  const { url } = req;
  const result = await fetch(replaceStreamingURL(url as string));
  result.headers.forEach((value, key) => res.setHeader(key, value));
  res.status(200).send(result.body);
};

export default handler;

export const config = {
  api: {
    responseLimit: false,
  },
};
