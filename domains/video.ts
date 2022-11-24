const threeHour: number = 3 * 60 * 60 * 1000;

export class Video {
  id: string;
  title: string;
  produceDateTime: Date;
  playTime: string;

  constructor(
    id: string,
    title: string,
    produceDateTime: number,
    playTime: string
  ) {
    this.id = id;
    this.title = title;
    this.produceDateTime = new Date(
      new Date(produceDateTime).getTime() - threeHour
    );
    this.playTime = playTime;
  }
}

export class VideoInfo {
  broadcast?: string;
  countries: Array<string>;
  half?: string;
  group?: string;
  data: Video;

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
    this.data = data;
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
    return this.data.produceDateTime.toLocaleDateString("ko-KR");
  }
  public get playTime(): string {
    return this.data.playTime;
  }
}
