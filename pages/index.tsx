import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const threeHour: number = 3 * 60 * 60 * 1000;

class Video {
  id: string;
  title: string;
  produceDateTime: Date;

  constructor(id: string, title: string, produceDateTime: number) {
    this.id = id;
    this.title = title;
    this.produceDateTime = new Date(
      new Date(produceDateTime).getTime() - threeHour
    );
  }

  public get date(): string {
    return this.produceDateTime.toLocaleDateString("ko-KR");
  }
}

const listUrl =
  "/video/lists/total?upperCategoryId=event&categoryId=qatar2022&page=1&pageSize=1000&sort=date&themeType=type&themeCode=2&fields=worldcup";

export default function Home() {
  const [videos, setVideos] = useState<Array<Video>>([]);

  useEffect(() => {
    (async () => {
      var x = await fetch(listUrl).then((response) => response.json());
      setVideos(
        x.result.videos
          .filter(
            (v: any) =>
              v.title.startsWith("[KBS") && v.title.endsWith("하이라이트")
          )
          .map(
            (v: any) => new Video(v.sportsVideoId, v.title, v.produceDateTime)
          )
      );
    })();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>NoSpoCup</title>
        <meta
          name="description"
          content="Watch 2022 Qatar World Cup clips without any spoiler"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>2022 카타르 월드컵 하이라이트 모음</h1>
        <div className={styles.grid}>
          {videos.map((v) => (
            <Link key={v.id} href={`/highlight/${v.id}`}>
              <div className={styles.card}>
                <p>{v.date}</p>
                <h2>{v.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
