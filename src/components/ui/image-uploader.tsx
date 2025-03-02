'use client';

import { useState } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { toast } from 'sonner';
import Image from 'next/image';
import error from 'next/error';

export default function ImageUploader({ onCaptionGenerated }: { onCaptionGenerated: (caption: string) => void }) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


const handleSubmit = async () => {
  if (!image || !imagePreview) {
    toast.error(error instanceof Error ? error.message : 'Please select an image to generate a caption.');
    return;
  }

  setLoading(true);

  try {
    setUploadStatus('Uploading image...');
    
    const formData = new FormData();
    formData.append('file', image);
    
    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      throw new Error(errorData.error || 'Failed to upload image');
    }

    const uploadData = await uploadResponse.json();
    
    console.log('Uploaded image data:', uploadData);
    
    if (!uploadData.url) {
      throw new Error('No image URL returned from upload');
    }
    
    setUploadStatus('Generating caption...');
    
    const captionResponse = await fetch('/api/caption', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64: imagePreview,
        imageUrl: uploadData.url, 
        publicId: uploadData.publicId
      }),
    });

    if (!captionResponse.ok) {
      const errorData = await captionResponse.json();
      throw new Error(errorData.error || 'Failed to generate caption');
    }

    const data = await captionResponse.json();
    onCaptionGenerated(data.caption);
    toast.error(error instanceof Error ? error.message : 'Your image caption has been generated successfully.');
  } catch (error) {
    console.error('Error in image processing:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to process image');
  } finally {
    setLoading(false);
    setUploadStatus('');
  }
};

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4">
          <div 
            className="w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors p-4"
            onClick={() => document.getElementById('image-input')?.click()}
          >
            {imagePreview ? (
              <div className="relative w-full h-full">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <>
                <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload an image</p>
              </>
            )}
            <input
              id="image-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <Button 
            onClick={handleSubmit} 
            disabled={!image || loading} 
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {uploadStatus || 'Processing...'}
              </>
            ) : (
              'Generate Caption'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}