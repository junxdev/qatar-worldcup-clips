import { VideoStreamingData } from "../../domains/video";
import { parseTitle } from "../../utils/parser";

const listUrl =
  "https://api-gw.sports.naver.com/video/lists/total?upperCategoryId=event&categoryId=qatar2022&sort=date&themeType=type&themeCode=2&fields=worldcup";
const proxyListURL =
  "/videos/total?upperCategoryId=event&categoryId=qatar2022&sort=date&themeType=type&themeCode=2&fields=worldcup";

interface GetVideosParams {
  page?: number;
  pageSize?: number;
  useProxy?: boolean;
}
export async function getVideos({
  page = 1,
  pageSize = 20,
  useProxy = false,
}: GetVideosParams): Promise<any> {
  return fetch(
    useProxy
      ? `${proxyListURL}&page=${page}&pageSize=${pageSize}`
      : `${listUrl}&page=${page}&pageSize=${pageSize}`
  ).then((response) => response.json());
}

const url2 = "https://api-gw.sports.naver.com/video";
const url = "https://apis.naver.com/rmcnmv/rmcnmv/vod/play/v2.0";

export async function getVideoStreaming(
  pid: string
): Promise<VideoStreamingData> {
  var x = await fetch(`${url2}/${pid}?fields=all`).then((r) => r.json());
  var y = await fetch(`${url}/${x.result.masterVid}?key=${x.result.inkey}`)
    .then((res) => res.json())
    .then(
      (x) =>
        x.streams[0].videos.filter(
          (v: any) => v.encodingOption.name == "1080P"
        )[0].source
    );
    
  return {
    url: replaceStreamingURL(y),
    title: parseTitle(x.result.title),
    gameDateTime: x.result.gameDateTime,
  } as VideoStreamingData;
}

const streamingURLMap = {
  "https://naver-sbs-h.smartmediarep.com": "sbs",
  "https://naver-kbs-h.smartmediarep.com": "kbs",
  "https://naver-mbc-h.smartmediarep.com": "mbc",
};

const replaceStreamingURL = (url: string) => {
  Object.entries(streamingURLMap).forEach(([origin, api]) => {
    url = url.replace(origin, api);
  });
  return url;
};
