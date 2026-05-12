import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export type CaptionStyle = 'funny' | 'romantic' | 'motivational' | 'sad' | 'aesthetic';

export async function generateCaptions(description: string, style: CaptionStyle): Promise<string[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 5 WhatsApp status captions for the following topic: "${description}". 
      The style should be: ${style}. 
      Return the captions as a simple list, one per line, without numbers or extra formatting.`,
    });

    const text = response.text || '';
    return text.split('\n').filter(line => line.trim().length > 0).slice(0, 5);
  } catch (error) {
    console.error("Error generating captions:", error);
    throw error;
  }
}
