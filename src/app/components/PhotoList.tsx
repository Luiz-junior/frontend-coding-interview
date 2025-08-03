import { useEffect, useState } from "react";
import { Photo } from "../types";
import PhotoCard from "./PhotoCard";
import { getLikedPhotos, toggleLike } from "../lib/auth";

interface PhotoGridProps {
  photos: Photo[];
}

export default function PhotoList({ photos }: PhotoGridProps) {
  const [likedPhotos, setLikedPhotos] = useState<string[]>([]);

  useEffect(() => {
    setLikedPhotos(getLikedPhotos());
  }, []);

  const handleToggleLike = (photoId: number) => {
    toggleLike(photoId.toString());
    setLikedPhotos(getLikedPhotos());
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[600px]">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isLiked={likedPhotos.includes(photo.id.toString())}
          onToggleLike={() => handleToggleLike(photo.id)}
        />
      ))}
    </div>
  );
}
