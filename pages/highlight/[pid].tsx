import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Player from "../../components/player";
import { VideoStreamingData } from "../../domains/video";
import styles from "../../styles/Home.module.css";
import { getVideoStreaming } from "../api/video";

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function Highlight({
  url,
  title,
  gameDateTime,
}: VideoStreamingData) {
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
      ``
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

export async function getServerSideProps({
  query: { pid },
  res,
}: GetServerSidePropsContext) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=3600"
  );
  
  return {
    props: await getVideoStreaming(pid as string),
  };
}
