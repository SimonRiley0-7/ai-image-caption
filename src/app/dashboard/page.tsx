'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import ImageUploader from '@/components/ui/image-uploader';
import CaptionDisplay from '@/components/ui/caption-display';

export default function Dashboard() {
  const [caption, setCaption] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Caption Generator</h1>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/history">
              <Button variant="outline">History</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Generate a Caption</h2>
          <div className="space-y-6">
            <ImageUploader onCaptionGenerated={setCaption} />
            <CaptionDisplay caption={caption} />
          </div>
        </div>
      </main>
      
      <footer className="border-t">
        <div className="container mx-auto py-6 px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Caption Generator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}