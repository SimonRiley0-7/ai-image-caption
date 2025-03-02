import { Suspense } from 'react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import  connectToDB  from '@/lib/mongodb';
import Caption from '@/models/caption';
import HistoryCard from '@/components/ui/history-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import mongoose from 'mongoose';

interface CaptionDocument {
    _id: mongoose.Types.ObjectId | string;
    userId: string;
    imageId: string;
    imageUrl: string;
    caption: string;
    createdAt: Date;
}

// Add this near the getCaptionHistory function
async function getCaptionHistory(userId: string) {
    await connectToDB();
    
    const captions = await Caption.find({ userId })
    .sort({ createdAt: -1 })
    .lean() as unknown as CaptionDocument[];
      
    // Debug log to see what URLs are coming from the database
    console.log('Retrieved captions:', captions.map(c => ({
      id: c._id.toString(),
      imageUrl: c.imageUrl,
      urlType: typeof c.imageUrl
    })));
      
    return captions.map((caption) => ({
      id: caption._id.toString(),
      imageUrl: caption.imageUrl,
      caption: caption.caption,
      date: new Date(caption.createdAt).toLocaleDateString(),
    }));
  }

export default async function HistoryPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  const captions = await getCaptionHistory(userId);
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Caption History</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <Suspense fallback={<p>Loading history...</p>}>
          {captions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {captions.map((caption) => (
                <HistoryCard
                  key={caption.id}
                  id={caption.id}
                  imageUrl={caption.imageUrl}
                  caption={caption.caption}
                  date={caption.date}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No caption history yet</h3>
              <p className="text-muted-foreground mb-6">
                Generate your first caption to see it here.
              </p>
              <Link href="/dashboard">
                <Button>Generate a Caption</Button>
              </Link>
            </div>
          )}
        </Suspense>
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