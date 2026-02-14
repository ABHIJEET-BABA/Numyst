
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

const getAIClient = () => {
  const apiKey = process.env.API_KEY || (window as any).process?.env?.API_KEY;
  return new GoogleGenAI({ apiKey: apiKey });
};

export const getPerfumeRecommendation = async (userQuery: string, imageData?: string): Promise<string> => {
  const client = getAIClient();
  const productContext = PRODUCTS.map(p => 
    `${p.name} (Notes: ${p.notes.join(', ')}, Vibe: ${p.tagline})`
  ).join('\n');

  const systemInstruction = `
    You are 'Ora', the Soul-Scent Visionary for Numyst.
    
    ULTRA-CONCISE MANDATE:
    1. MAX 2-3 BULLETS: No paragraphs, no long intros.
    2. ONE SENTENCE PER BULLET: Be extremely direct.
    3. BRAND VOICE: Poetic, elite, and deeply Indian.
    4. RECOMMEND ONE: Pick from ce-lest, miRge, shadOw, cRush, or El3ment.

    REPLY FORMAT (STRICT):
    • [Your intuition about their current energy]
    • [The recommended scent and why it fits]
    • [A brief poetic blessing or thought]
    
    CATALOG:
    ${productContext}
  `;

  try {
    const parts: any[] = [{ text: userQuery }];
    if (imageData) {
      parts.push({
        inlineData: { data: imageData.split(',')[1], mimeType: 'image/jpeg' }
      });
    }

    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: { systemInstruction }
    });
    
    return response.text || "• Sensing a shift.\n• Explore our collection.\n• Stay centered.";
  } catch (error) {
    return "• System is quiet.\n• Verify your essence keys.\n• I am waiting.";
  }
};

export const analyzeMoodAndRecommend = async (imageData: string, textPrompt: string): Promise<{ recommendation: string, productName: string }> => {
  const client = getAIClient();
  const productContext = PRODUCTS.map(p => `${p.name}: ${p.tagline}`).join('\n');
  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: imageData.split(',')[1], mimeType: 'image/jpeg' } },
          { text: `Analyze vibe: "${textPrompt}". Pick ONE from: ${productContext}. Format: NAME: [Name] REASON: [One short sentence]` }
        ]
      }
    });
    const text = response.text || "";
    const nameMatch = text.match(/NAME:\s*(.*)/i);
    const reasonMatch = text.match(/REASON:\s*(.*)/i);
    return {
      productName: nameMatch ? nameMatch[1].trim() : PRODUCTS[0].name,
      recommendation: reasonMatch ? reasonMatch[1].trim() : "Aligned with our core essence."
    };
  } catch (error) {
    return { productName: PRODUCTS[0].name, recommendation: "The stars align for this choice." };
  }
};

export const generateScentVisual = async (productName: string, mood: string): Promise<string> => {
  const client = getAIClient();
  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `Luxury perfume editorial: "${productName}". Mood: ${mood}.` }]
      },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return "";
  } catch (error) {
    return "";
  }
};
