import { GoogleGenerativeAI, Part } from "@google/generative-ai";

export async function generateImageCaption(imageBase64: string): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY environment variable is not set");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    if (!imageBase64 || typeof imageBase64 !== 'string') {
      throw new Error("Invalid image data provided");
    }
    if (!imageBase64.includes(';base64,')) {
      throw new Error("Invalid image format. Must be a base64 encoded data URL.");
    }
    
    const [mimeTypeSegment, base64Data] = imageBase64.split(';base64,');

    const mimeType = mimeTypeSegment.split(':')[1];
    
    if (!mimeType) {
      throw new Error("Could not determine mime type from image data");
    }

    console.log(`Processing image with mime type: ${mimeType}`);

    const imagePart: Part = {
      inlineData: {
        mimeType: mimeType,
        data: base64Data
      }
    };

    const textPart: Part = {
      text: "Generate a detailed caption for this image."
    };

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [textPart, imagePart] }]
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating image caption:", error);
    throw error;
  }
}