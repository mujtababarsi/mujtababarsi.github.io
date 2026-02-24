import { GoogleGenAI } from "@google/genai";

export async function callGemini(prompt: string, systemInstruction: string = "") {
  // Exponential backoff retry logic wrapping the SDK call
  const fetchWithRetry = async (retries = 5, delay = 1000): Promise<string> => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-09-2025',
        contents: { parts: [{ text: prompt }] },
        config: {
          systemInstruction: { parts: [{ text: systemInstruction }] }
        }
      });

      return response.text || "No response generated.";
    } catch (err) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(retries - 1, delay * 2);
      }
      throw err;
    }
  };

  try {
    return await fetchWithRetry();
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "The AI assistant is currently unavailable. Please try again later.";
  }
}