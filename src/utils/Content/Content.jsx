"use client";
import Image from "next/image";
import React from "react";

export const Content = ({ url, refCon, lazy = true, ...rest }) => {
  const isImage = url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
  const isVideo = url.match(/\.(mp4|webm)$/) != null;

  if (typeof window === "undefined") {
    return null; // or a placeholder component
  }

  return (
    <>
      {isVideo && (
        <video
          loop
          muted
          autoPlay
          webkit-playsinline="true"
          playsInline
          {...rest}
          ref={refCon && refCon}
        >
          <source src={url} />
        </video>
      )}
      {isImage && <Image src={url} ref={refCon && refCon} {...rest} />}
    </>
  );
};
