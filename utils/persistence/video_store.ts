import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { VideoInfo } from "../../domains/video";

interface VideosState {
  videos: Array<VideoInfo>;
  setVideos: (videos: Array<VideoInfo>) => void;
}

export const useVideoStore = create<VideosState>()(
  devtools(
    persist(
      (set) => ({
        videos: [],
        setVideos: (videos) => set((_) => ({ videos: videos })),
      }),
      {
        name: "video-storage",
      }
    )
  )
);
