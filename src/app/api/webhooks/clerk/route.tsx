import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import connectToDB from '@/lib/mongodb';

export async function POST(req: Request) {
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error: Missing Svix headers', {
      status: 400,
    });
  }
  const payload = await req.json();
  const { type } = payload;
  await connectToDB();
  return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
}