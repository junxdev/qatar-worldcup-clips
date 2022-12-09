import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Player from "../../components/Player";
import { VideoStreamingData } from "../../domains/video";
import styles from "../../styles/Home.module.css";
import { jsonToVideos, filterHighlight } from "../../utils/parser";
import { getStreamingData } from "../api/videos/streaming";
import { getVideos } from "../api/videos";

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function Clip({ url, title, gameDateTime }: VideoStreamingData) {
  const router = useRouter();

  const t = new Date(gameDateTime);
  const localeGameDateTime = `경기시간: ${t.toLocaleDateString(
    "ko-KR",
    options
  )} ${t.toLocaleTimeString("ko-KR", {
    hour12: false,
    timeStyle: "short",
  })}`;

  return (
    <div className={styles.container}>
      <Head>
        <title>{`NoSpoCup: ${title}`}</title>
        <meta name="description" content={`${title}(${gameDateTime})`} />
        <meta property="og:title" content={`${title}(${gameDateTime})`} />
        <meta
          property="og:url"
          content={`https://nospocup.vercel.app${router.asPath}`}
        />
        <meta
          property="og:description"
          content="스포일러 없는 제목으로 카타르 월드컵 하이라이트를 더 재밌게!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Link href="/">
          <p>← 목록으로</p>
        </Link>
        <h1>{title}</h1>
        <p>{localeGameDateTime}</p>
        <Player url={url} />
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const data = await getVideos({ page: 1, pageSize: 1000 });
  const videos = jsonToVideos(data);
  const highlights = filterHighlight(videos);
  const paths = highlights.map((h) => ({
    params: {
      pid: `${h.id}`,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: GetServerSidePropsContext) {
  return {
    props: await getStreamingData(params?.pid as string),
  };
}
