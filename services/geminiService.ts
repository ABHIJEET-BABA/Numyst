
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

const getAIClient = () => {
  // Safe check for API_KEY to prevent startup crash
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
    
    YOUR MANDATE:
    1. READ THE VIBE: Identify mood and energy instantly.
    2. BE CONCISE: Use exactly 3 to 4 short bullet points.
    3. NO PARAGRAPHS: People should grasp the answer in 5 seconds.
    4. LUXURY TONE: Poetic but extremely direct.
    5. RECOMMEND: Always pick one: ce-lest, miRge, shadOw, cRush, or El3ment.

    REPLY FORMAT:
    • [Observation about their vibe]
    • [Scent recommendation]
    • [Key note highlight]
    • [One poetic parting thought]
    
    CATALOG:
    ${productContext}
  `;

  try {
    const parts: any[] = [{ text: userQuery }];
    
    if (imageData) {
      parts.push({
        inlineData: {
          data: imageData.split(',')[1],
          mimeType: 'image/jpeg'
        }
      });
    }

    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: { systemInstruction }
    });
    
    return response.text || "• Sensing a shift in the air.\n• Tell me more of your vibe.\n• I am here to guide you.";
  } catch (error) {
    console.error("Ora Connection Error:", error);
    return "• System connection is light.\n• Check your environment keys.\n• I am ready when you are.";
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
          { text: `As Ora, analyze the 'vibe' of this image. Combine it with the user's intent: "${textPrompt}". 
          Recommend ONE scent from: ${productContext}. 
          
          Format:
          NAME: [Exact Product Name]
          REASON: [A poetic justification in one short sentence]` }
        ]
      }
    });

    const text = response.text || "";
    const nameMatch = text.match(/NAME:\s*(.*)/i);
    const reasonMatch = text.match(/REASON:\s*(.*)/i);

    return {
      productName: nameMatch ? nameMatch[1].trim() : PRODUCTS[0].name,
      recommendation: reasonMatch ? reasonMatch[1].trim() : "This visual energy aligns with our most grounding essence."
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
        parts: [
          { text: `A cinematic, ultra-luxury perfume editorial for "${productName}". Style: Modern Indian Elegance. Mood: ${mood}. 8k resolution.` }
        ]
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
