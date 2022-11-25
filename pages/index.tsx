import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Video, VideoInfo } from "../domains/video";
import styles from "../styles/Home.module.css";
import { parseVideo } from "../utils/parser";

const listUrl =
  "/video/lists/total?upperCategoryId=event&categoryId=qatar2022&page=1&pageSize=1000&sort=date&themeType=type&themeCode=2&fields=worldcup";

export default function Home() {
  const [videos, setVideos] = useState<Array<VideoInfo>>([]);

  useEffect(() => {
    (async () => {
      var x = await fetch(listUrl).then((response) => response.json());
      var vs = x.result.videos.map(
        (v: any) =>
          new Video(v.sportsVideoId, v.title, v.produceDateTime, v.playTime)
      );
      setVideos(parseVideo(vs));
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
        <p className={styles.description}>
          스포일러 없는 제목으로 하이라이트를 더 재밌게!
        </p>
        <div className={styles.grid}>
          {videos.map((v) => (
            <Link key={v.data.id} href={`/highlight/${v.data.id}`}>
              <div className={styles.card}>
                <p>{v.date}</p>
                <h2>{v.title}</h2>
                <p>{v.playTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
