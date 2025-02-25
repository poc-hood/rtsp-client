"use client";
import { useEffect, useRef, useState } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";

interface JsmpegPlayerProps {
  videoUrl: string;
  options: {
    autoplay: boolean;
    loop: boolean;
  };
}

const JsmpegPlayer = ({ videoUrl, options }: JsmpegPlayerProps) => {
  const videoWrapperRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = new JSMpeg.VideoElement(
      videoWrapperRef.current,
      videoUrl,
      options,
    );
  }, [videoUrl, options]);

  return <div className="w-80 h-80 bg-white" ref={videoWrapperRef}></div>;
};

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const options = { autoplay: true, loop: true };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setVideoUrl("ws://" + window.location.hostname + ":9999");
    }
  }, []);

  return (
    <div>
      {videoUrl && (
        <>
          My stream on: {videoUrl}
          <JsmpegPlayer videoUrl={videoUrl} options={options} />
        </>
      )}
    </div>
  );
}
