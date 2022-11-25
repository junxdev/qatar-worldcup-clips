import { VideoData, VideoStreamingData } from "../../domains/video";
import { parseTitle } from "../../utils/parser";

const listUrl =
  "https://api-gw.sports.naver.com/video/lists/total?upperCategoryId=event&categoryId=qatar2022&page=1&pageSize=1000&sort=date&themeType=type&themeCode=2&fields=worldcup";

export async function getVideos(): Promise<VideoData[]> {
  var x = await fetch(listUrl).then((response) => response.json());
  return x.result.videos.map(
    (v: any) => {
      return {
        sportsVideoId: v.sportsVideoId,
        title: v.title,
        produceDateTime: v.produceDateTime,
        playTime: v.playTime,
      } as VideoData;
    }
  );
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
    url: y,
    title: parseTitle(x.result.title),
    gameDateTime: x.result.gameDateTime,
  } as VideoStreamingData;
}
