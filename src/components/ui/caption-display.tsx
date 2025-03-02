'use client';

import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function CaptionDisplay({ caption }: { caption: string }) {

  const copyToClipboard = () => {
    navigator.clipboard.writeText(caption);
    toast({
      title: 'Copied to clipboard',
      description: 'Caption has been copied to clipboard.',
    });
  };

  if (!caption) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Generated Caption
          <Button variant="ghost" size="icon" onClick={copyToClipboard}>
            <Copy className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{caption}</p>
      </CardContent>
    </Card>
  );
}
