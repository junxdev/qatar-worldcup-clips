import create from "zustand";
import { devtools } from "zustand/middleware";
import { Video } from "../../domains/video";
import { getVideos } from "../../pages/api/video";
import { convertToVideo } from "../parser";

interface VideoState {
  videos: Video[];
  hasMore: boolean;
  lastScrollY: number;
  saveScrollY: (scrollY: number) => void;
  next: () => Promise<void>;
}

const pageSize: number = 40;

export const useVideoStore = create<VideoState>()(
  devtools(
    (set, get) => {
      return {
        videos: [],
        hasMore: true,
        lastScrollY: 0,
        saveScrollY: (scrollY) => {
          set((_) => {
            return {
              lastScrollY: scrollY,
            };
          });
        },
        next: async () => {
          const page = Math.ceil(get().videos.length / pageSize) + 1;
          const data = await getVideos({
            page: page,
            pageSize: pageSize,
            useProxy: true,
          });
          const newVideos = convertToVideo(data);
          set((state) => {
            return {
              videos: [...state.videos, ...newVideos],
              hasMore:
                state.videos.length + newVideos.length < data.result.totalCount,
            };
          });
        },
      };
    },
    {
      name: "video-storage",
    }
  )
);
