import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

type Props = {
  url: string;
};

export default function Player({ url }: Props) {
  const [title, setTitle] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    (async () => {
      var x = await fetch(url).then((response) => response.json());
      setTitle(x.meta.subject);
      renderVideo(x.streams[0].videos.filter((v:any) => v.encodingOption.name == "1080P")[0].source);
    })();
  }, [url]);

  function renderVideo(s: string) {
    if (!videoRef.current) return;

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(s);
      hls.attachMedia(videoRef.current!);
    } else if (videoRef.current!.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current!.src = s;
    } else {
      console.error(
        "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
      );
    }
  }

  return <video ref={videoRef} controls width="100%"></video>;
}
