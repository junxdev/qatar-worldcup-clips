import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

type Props = {
  url: string;
};

export default function Player({ url }: Props) {
  const [title, setTitle] = useState<string>("");
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    (async () => {
      try {
        var x = await fetch(url).then((response) => response.json());
        setTitle(x.meta.subject);
        renderVideo(x.streams[0].videos[3].source);
      } catch (error) {
        // TF, SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
        // console.log(error);
      }
    })();
  }, [url]);

  function renderVideo(s: string) {
    if (!video.current) return;
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(s);
      hls.attachMedia(video.current!);
    } else if (video.current!.canPlayType("application/vnd.apple.mpegurl")) {
      video.current!.src = s;
    }
  }

  return (
      <video ref={video} controls width="100%"></video>
  );
}
