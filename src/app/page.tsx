"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Caption Generator</h1>
          <div>
            {userId ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/sign-in">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Generate AI Captions for Your Images</h2>
          <p className="text-xl mb-8">
            Upload your photos and get creative, detailed captions powered by Google&apos;s Gemini AI.
          </p>
          <div className="flex justify-center gap-4">
            {userId ? (
              <Link href="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
            ) : (
              <Link href="/sign-up">
                <Button size="lg">Get Started</Button>
              </Link>
            )}
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
