import { useEffect, useRef } from "react";
import Hls from "hls.js";

type Props = {
  url: string;
};

export default function Player({ url }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function renderVideo(url: string) {
    if (!videoRef.current) return;
    if (Hls.isSupported()) {
      var hls = new Hls();

      hls.loadSource(url);
      hls.attachMedia(videoRef.current!);
    } else if (videoRef.current!.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current!.src = url;
    } else {
      console.error(
        "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
      );
    }
  }

  useEffect(() => {
    renderVideo(url);
  }, [url]);

  return <video ref={videoRef} controls width="100%"></video>;
}
