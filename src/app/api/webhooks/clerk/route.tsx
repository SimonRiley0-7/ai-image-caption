import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import connectToDB from '@/lib/mongodb';

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error: Missing Svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Handle the webhook
  const { type } = payload;
  
  // Connect to the database
  await connectToDB();

  // Handle user creation or deletion events if needed
  if (type === 'user.created') {
    // Optional: Create user in your database
  } else if (type === 'user.deleted') {
    // Optional: Delete user data
  }

  return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
}