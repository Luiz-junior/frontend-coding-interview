"use client";

import Image from "next/image";
import { Photo } from "../types";
import Link from "next/link";

interface PhotoCardProps {
  photo: Photo;
  isLiked: boolean;
  onToggleLike: () => void;
}

export default function PhotoCard({
  photo,
  isLiked,
  onToggleLike,
}: PhotoCardProps) {
  return (
    <div className="overflow-hidden">
      <div className="flex gap-x-3 items-start">
        <button onClick={() => onToggleLike()}>
          <Image
            src={isLiked ? "/like.svg" : "/unlike.svg"}
            alt="Like photo"
            width={19}
            height={19}
          />
        </button>
        <Image
          src={photo.src.medium}
          alt={photo.alt}
          width={75}
          height={75}
          className="rounded-md h-[75px] w-[75px] object-cover"
          quality={50}
        />
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold">{photo.photographer}</span>

            <Link
              href={photo.photographer_url}
              className="flex gap-x-1 text-xs text-[#0075EB]"
              target="_blank"
            >
              <Image
                src="/link.svg"
                alt="link portifolio"
                width={12}
                height={12}
              />
              <span>Portifolio</span>
            </Link>
          </div>

          <span className="text-sm overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">
            {photo.alt}
          </span>
          <span className="text-sm">{photo.avg_color}</span>
        </div>
      </div>
    </div>
  );
}
