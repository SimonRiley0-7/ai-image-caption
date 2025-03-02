// components/caption-detail-modal.tsx
"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './dialog';
import { Button } from './button';
import { X, Copy } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface CaptionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  caption: string;
  date: string;
}

export default function CaptionDetailModal({
  isOpen,
  onClose,
  imageUrl,
  caption,
  date,
}: CaptionDetailModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle>Caption Details</DialogTitle>
            <DialogClose asChild>
              
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto p-6 pt-2">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Caption image"
                    fill
                    className="object-contain rounded-md"
                    unoptimized={imageUrl.startsWith('data:image/')}
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted flex items-center justify-center rounded-md">
                    <p className="text-muted-foreground">Image unavailable</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:w-1/2 flex flex-col space-y-4">
              <div className="bg-muted p-4 rounded-md flex-grow overflow-auto max-h-96">
                <p className="mb-2 text-sm font-medium">Caption:</p>
                <p className="text-sm whitespace-pre-wrap">{caption}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">{date}</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleCopyCaption}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy Caption"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}