import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import clsx from "clsx";

export function BookingMediaGallery({ mediaList = [] }) {
  if (!mediaList.length) {
    return (
      <p className="text-center text-[var(--color-text)]">No media uploaded yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {mediaList.map((media, index) => (
        <div key={index} className="relative rounded overflow-hidden shadow group">
          {media.type === "video" ? (
            <div className="relative">
              <video src={media.url} controls className="h-48 w-full object-cover" />
              <FaPlayCircle className="absolute top-1/2 left-1/2 text-5xl text-white opacity-80 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          ) : (
            <img
              src={media.url}
              alt={media.label || `media-${index}`}
              className="h-48 w-full object-cover"
            />
          )}
          {media.label && (
            <div className="bg-[--color-bg-dark]/60 absolute bottom-0 left-0 w-full truncate px-2 py-1 text-xs text-[--color-text-light]">
              {media.label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


// auto‑added by add-default-exports.js
export default BookingMediaGallery;
