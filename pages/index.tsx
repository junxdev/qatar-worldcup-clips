import Head from "next/head";
import styles from "../styles/Home.module.css";
import { VideoList } from "../components/HighlightList";

export default function ClipsPage() {
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
        {<VideoList />}
      </main>
    </div>
  );
}
