"use client";

import { useRef, useState } from "react";
import { factoryVideos } from "../site";

export default function FactoryVideoGallery() {
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const toggleVideo = async (src: string) => {
    const selectedVideo = videoRefs.current[src];

    if (!selectedVideo) {
      return;
    }

    if (!selectedVideo.paused) {
      selectedVideo.pause();
      return;
    }

    Object.entries(videoRefs.current).forEach(([videoSrc, video]) => {
      if (videoSrc !== src && video && !video.paused) {
        video.pause();
      }
    });

    selectedVideo.muted = true;

    try {
      await selectedVideo.play();
      setActiveVideo(src);
    } catch {
      setActiveVideo(null);
    }
  };

  const renderVideo = (video: (typeof factoryVideos)[number], className: string) => {
    const isPlaying = activeVideo === video.src;

    return (
      <figure className={className} key={video.src}>
        <div className="factory-video-media">
          <video
            aria-label={`${video.title} video`}
            loop
            muted
            onClick={() => toggleVideo(video.src)}
            onPause={() => setActiveVideo((current) => (current === video.src ? null : current))}
            onPlay={() => setActiveVideo(video.src)}
            playsInline
            preload="metadata"
            ref={(element) => {
              videoRefs.current[video.src] = element;
            }}
          >
            <source src={video.src} type="video/mp4" />
          </video>
          <button
            aria-label={`${isPlaying ? "Pause" : "Play"} ${video.title}`}
            aria-pressed={isPlaying}
            className="factory-video-action"
            onClick={() => toggleVideo(video.src)}
            type="button"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
        <figcaption>
          <strong>{video.title}</strong>
          <span>{video.description}</span>
        </figcaption>
      </figure>
    );
  };

  return (
    <div className="factory-video-section" aria-labelledby="factory-video-title">
      <div className="section-heading compact">
        <p className="eyebrow">Factory Process Video</p>
        <h3 id="factory-video-title">Production processes from material handling to final packaging.</h3>
      </div>
      {factoryVideos
        .filter((video) => video.layout === "feature")
        .map((video) => renderVideo(video, "factory-video-feature"))}
      <div className="factory-video-grid">
        {factoryVideos
          .filter((video) => video.layout === "process")
          .map((video) => renderVideo(video, "factory-video-card"))}
      </div>
    </div>
  );
}
