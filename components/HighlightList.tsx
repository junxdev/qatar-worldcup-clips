import InfiniteScroll from "react-infinite-scroll-component";
import { useVideoStore } from "../utils/persistence/videos-store";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { filterHighlight } from "../utils/parser";
import { useEffect } from "react";

export const HighlightList = () => {
  const { videos, hasMore, next, lastScrollY, saveScrollY } = useVideoStore();
  const highlights = filterHighlight(videos);

  useEffect(() => {
    window.scrollTo({ top: lastScrollY });
  }, [lastScrollY]);

  useEffect(() => {
    if (window.screen.availHeight > document.body.scrollHeight) next();
  }, [next]);

  return (
    <>
      <InfiniteScroll
        next={next}
        hasMore={hasMore}
        loader={undefined}
        dataLength={highlights.length}
      >
        <div className={styles.grid}>
          {highlights.map((v) => {
            return (
              <Link
                key={v.id}
                href={`/highlights/${v.id}`}
                onClick={() => saveScrollY(window.pageYOffset)}
              >
                <div className={styles.card}>
                  <p>{v.date}</p>
                  <h2>{v.title}</h2>
                  <p>{v.playTime}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
};
