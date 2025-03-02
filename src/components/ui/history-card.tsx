
"use client";
import { useState } from 'react';
import { Card, CardContent } from './card';
import Image from 'next/image';
import CaptionDetailModal from './caption-detail-modal';

interface HistoryCardProps {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
}

export default function HistoryCard({ imageUrl, caption, date }: HistoryCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card 
        className="overflow-hidden h-full flex flex-col cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-48 w-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Caption history"
              fill
              className="object-cover"
              unoptimized={imageUrl.startsWith('data:image/')}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-muted">
              <p className="text-muted-foreground">Image not available</p>
            </div>
          )}
        </div>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <p className="text-sm line-clamp-3 mb-2">{caption}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-auto">{date}</p>
        </CardContent>
      </Card>

      <CaptionDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={imageUrl}
        caption={caption}
        date={date}
      />
    </>
  );
}