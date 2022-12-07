import { Video, Highlight } from "../domains/video";

const countries = [
  "카타르",
  "에콰도르",
  "세네갈",
  "네덜란드",
  "잉글랜드",
  "이란",
  "미국",
  "웨일스",
  "아르헨티나",
  "사우디아라비아",
  "멕시코",
  "폴란드",
  "프랑스",
  "덴마크",
  "튀니지",
  "호주",
  "스페인",
  "독일",
  "일본",
  "코스타리카",
  "벨기에",
  "캐나다",
  "모로코",
  "크로아티아",
  "브라질",
  "세르비아",
  "스위스",
  "카메룬",
  "포르투갈",
  "가나",
  "우루과이",
  "대한민국",
];

const groups = ["A조", "B조", "C조", "D조", "E조", "F조", "G조", "H조"];

const countriesReg = new RegExp(`(${countries.join("|")})(?!.*\\1)`, "g");

function findCountries(title: string) {
  var noQatarWorldcup = title.replaceAll(/카타르 월드컵|카타르월드컵/g, "");
  var result = noQatarWorldcup.match(countriesReg);

  return result ?? [];
}

function findHalf(title: string) {
  var result = title.match(/(전반|후반)(?!.*\\1)/g);

  return result?.at(0);
}

const groupsReg = new RegExp(`(${groups.join("|")})(?!.*\\1)`, "g");
function findGroup(title: string) {
  var result = title.match(groupsReg);

  return result?.at(0);
}

function findBroadcast(title: string) {
  var result = title.match(/(KBS|SBS|MBC)(?!.*\\1)/g);

  return result?.at(0);
}

function _filterHighlight(videos: Video[]): Video[] {
  return videos
    .filter((v: any) => /KBS|MBC|SBS/g.test(v.title))
    .filter((v: any) => /하이라이트|H\\L/g.test(v.title))
    .filter((v: any) => !/전반|승부차기/g.test(v.title));
}

function _filterFullHighlight(videos: any) {
  var result: Array<Highlight> = [];

  videos.forEach((v: any) => {
    var c = findCountries(v.title);
    if (c.length != 2) return;

    result.push(
      new Highlight(
        findBroadcast(v.title),
        c,
        findHalf(v.title),
        findGroup(v.title),
        v
      )
    );
  });

  return result;
}

export function filterHighlight(videos: Video[]) {
  var v2 = _filterHighlight(videos);
  var v3 = _filterFullHighlight(v2);
  return v3;
}

export function parseTitle(title: string) {
  var broadcast = findBroadcast(title);
  var countries = findCountries(title);
  var half = findHalf(title);
  var group = findGroup(title);
  return [`[${broadcast}]`, group, countries.join("vs"), half, "하이라이트"]
    .filter((v) => v != undefined)
    .join(" ");
}

export const convertToVideo = (data: any): Video[] => {
  return data.result.videos.map((v: any) => {
    return {
      sportsVideoId: v.sportsVideoId,
      title: v.title,
      produceDateTime: v.produceDateTime,
      playTime: v.playTime,
    } as Video;
  });
};
