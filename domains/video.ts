export type Video = {
  sportsVideoId: string;
  title: string;
  produceDateTime: number;
  playTime: string;
  page: number;
  index: number;
};

export type VideoStreamingData = {
  url: string;
  title: string;
  gameDateTime: string;
};

const threeHour: number = 3 * 60 * 60 * 1000;

export class Highlight {
  broadcast?: string;
  countries: Array<string>;
  half?: string;
  group?: string;
  id: string;
  originalTitle: string;
  produceDateTime: Date;
  playTime: string;

  constructor(
    broadcast: string | undefined,
    countries: Array<string>,
    half: string | undefined,
    group: string | undefined,
    data: Video
  ) {
    this.broadcast = broadcast;
    this.countries = countries;
    this.half = half;
    this.group = group;
    this.id = data.sportsVideoId;
    this.originalTitle = data.title;
    this.produceDateTime = new Date(
      new Date(data.produceDateTime).getTime() - threeHour
    );
    this.playTime = data.playTime;
  }

  public get title() {
    return [
      `[${this.broadcast}]`,
      this.group,
      this.countries.join("vs"),
      this.half,
      "하이라이트",
    ]
      .filter((v) => v != undefined)
      .join(" ");
  }

  public get date(): string {
    return this.produceDateTime.toLocaleDateString("ko-KR");
  }
}
