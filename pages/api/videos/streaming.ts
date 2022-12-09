import { VideoStreamingData as StreamingData } from "../../../domains/video";
import { parseTitle } from "../../../utils/parser";

const videoURL = "https://api-gw.sports.naver.com/video";
const vodURL = "https://apis.naver.com/rmcnmv/rmcnmv/vod/play/v2.0";

export async function getStreamingData(pid: string): Promise<StreamingData> {
  var x = await fetch(`${videoURL}/${pid}?fields=all`).then((r) => r.json());
  var y = await fetch(`${vodURL}/${x.result.masterVid}?key=${x.result.inkey}`)
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
  } as StreamingData;
}

const streamingURLMap = {
  "https://naver-sbs-h.smartmediarep.com": "/api/highlights/sbs",
  "https://naver-kbs-h.smartmediarep.com": "/api/highlights/kbs",
  "https://naver-mbc-h.smartmediarep.com": "/api/highlights/mbc",
};

const replaceStreamingURL = (url: string) => {
  Object.entries(streamingURLMap).forEach(([origin, api]) => {
    url = url.replace(origin, api);
  });
  return url;
};
