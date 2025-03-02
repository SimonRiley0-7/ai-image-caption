// app/api/caption/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { generateImageCaption } from '@/lib/gemini';
import connectToDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request data
    const data = await req.json();
    const { imageBase64, imageUrl, publicId } = data;

    if (!imageBase64) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    // Generate caption using Gemini API
    const caption = await generateImageCaption(imageBase64);

    // Connect to MongoDB
    await connectToDB();
    
    // Ensure the Caption model has the correct schema
    // Import this way to get a fresh copy of the schema
    const captionSchema = new mongoose.Schema({
      userId: { type: String, required: true },
      imageId: { type: String, required: true },
      imageUrl: { type: String, required: true },
      caption: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    });
    
    // Delete and recreate the model to force schema update
    if (mongoose.models.Caption) {
      delete mongoose.models.Caption;
    }
    
    const Caption = mongoose.model('Caption', captionSchema);

    // Save caption to database with the uploaded image URL
    const newCaption = new Caption({
      userId,
      imageId: publicId,
      imageUrl,
      caption,
      createdAt: new Date(),
    });

    await newCaption.save();
    
    // Verify saved data
    console.log('Saved caption document:', await Caption.findById(newCaption._id).lean());

    return NextResponse.json({ caption }, { status: 200 });
  } catch (error) {
    console.error('Error processing caption request:', error);
    return NextResponse.json({ error: 'Failed to generate caption' }, { status: 500 });
  }
}