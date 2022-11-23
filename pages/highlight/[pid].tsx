import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Player from "../../components/player";
import styles from "../../styles/Home.module.css";

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function Highlight() {
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [gameDateTime, setGameDateTime] = useState<string>();
  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    (async () => {
      var x = await fetch(`/naver/video/${pid}?fields=all`).then((r) =>
        r.json()
      );
      setUrl(
        `https://apis.naver.com/rmcnmv/rmcnmv/vod/play/v2.0/${x.result.masterVid}?key=${x.result.inkey}`
      );
      setTitle(x.result.title);
      var t = new Date(x.result.gameDateTime);
      setGameDateTime(
        `경기시간: ${t.toLocaleDateString(
          "ko-KR",
          options
        )} ${t.toLocaleTimeString("ko-KR", {
          hour12: false,
          timeStyle: "short",
        })}`
      );
    })();
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>{`NoSpoCup: ${title}`}</title>
        <meta name="description" content={`${title}(${gameDateTime})`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Link href="/">
          <p>← 목록으로</p>
        </Link>
        <h1>{title}</h1>
        <p>{gameDateTime}</p>
        <Player url={url} />;
      </main>
    </div>
  );
}
