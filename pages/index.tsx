import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { VideoData } from "../domains/video";
import styles from "../styles/Home.module.css";
import { parseVideo } from "../utils/parser";
import { getVideos } from "./api/video";

type Props = {
  videos: VideoData[];
};

export default function Home(props: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>NoSpoCup</title>
        <meta
          name="description"
          content="Watch 2022 Qatar World Cup clips without any spoiler"
        />
        <meta property="og:title" content="NoSpoCup" />
        <meta property="og:url" content="https://nospocup.vercel.app" />
        <meta
          property="og:description"
          content="스포일러 없는 제목으로 카타르 월드컵 하이라이트를 더 재밌게!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>2022 카타르 월드컵 하이라이트 모음</h1>
        <p className={styles.description}>
          스포일러 없는 제목으로 하이라이트를 더 재밌게!
        </p>
        <div className={styles.grid}>
          {parseVideo(props.videos).map((v) => (
            <Link key={v.id} href={`/highlight/${v.id}`}>
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

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=3600"
  );

  return {
    props: { videos: await getVideos() } as Props,
  };
}
