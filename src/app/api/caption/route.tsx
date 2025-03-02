import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { generateImageCaption } from '@/lib/gemini';
import connectToDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { imageBase64, imageUrl, publicId } = data;

    if (!imageBase64) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }
    const caption = await generateImageCaption(imageBase64);

    await connectToDB();
    
    const captionSchema = new mongoose.Schema({
      userId: { type: String, required: true },
      imageId: { type: String, required: true },
      imageUrl: { type: String, required: true },
      caption: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    });
 
    if (mongoose.models.Caption) {
      delete mongoose.models.Caption;
    }
    
    const Caption = mongoose.model('Caption', captionSchema);

    const newCaption = new Caption({
      userId,
      imageId: publicId,
      imageUrl,
      caption,
      createdAt: new Date(),
    });

    await newCaption.save();
  
    console.log('Saved caption document:', await Caption.findById(newCaption._id).lean());

    return NextResponse.json({ caption }, { status: 200 });
  } catch (error) {
    console.error('Error processing caption request:', error);
    return NextResponse.json({ error: 'Failed to generate caption' }, { status: 500 });
  }
}