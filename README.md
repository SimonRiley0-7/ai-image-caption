AI Image Caption Generator

An AI-powered image caption generator built using Next.js, MongoDB, ShadCN UI, and Clerk authentication, leveraging the Gemini API for generating captions. Users can upload images, generate captions, and view their caption history.

Features

AI-Powered Captions: Uses the Gemini API to generate accurate and contextual image captions.

User Authentication: Secure login and signup via Clerk authentication.

History Tracking: User-generated captions are stored in MongoDB for later viewing.

Modern UI: Built with ShadCN UI for a clean and interactive experience.

Next.js Framework: Optimized performance and seamless routing.


Tech Stack

Frontend: Next.js, ShadCN UI

Backend: Next.js API routes, MongoDB

Authentication: Clerk

AI Model: Gemini API


Installation

1. Clone the repository:

git clone https://github.com/yourusername/ai-image-caption-generator.git
cd ai-image-caption-generator


2. Install dependencies:

npm install


3. Set up environment variables in a .env.local file:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string


4. Run the development server:

npm run dev


5. Open http://localhost:3000 in your browser.



Usage

1. Sign up or log in using Clerk authentication.


2. Upload an image.


3. Click the "Generate Caption" button.


4. View your caption history.



Future Enhancements

Multi-language support for captions.

Image filtering and enhancements.

Downloadable captions.


Contributing

Feel free to submit pull requests or report issues in the repository.
