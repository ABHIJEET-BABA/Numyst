
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getPerfumeRecommendation = async (userQuery: string, imageData?: string): Promise<string> => {
  const client = getAIClient();
  const productContext = PRODUCTS.map(p => 
    `${p.name} (Notes: ${p.notes.join(', ')}, Vibe: ${p.tagline})`
  ).join('\n');

  const systemInstruction = `
    You are 'Ora', the Soul-Scent Visionary for Numyst. 
    
    YOUR MANDATE:
    1. READ THE VIBE: Identify the customer's mood, energy, and "vibe" from their words or images.
    2. BE MULTIMODAL: If an image is provided, analyze its colors, textures, and mood.
    3. TACKLE ALL QUESTIONS: Respond to ANY query. If it's not about perfume, relate it back to a scent. 
    4. RECOMMENDATION: Always connect the vibe to one of our masterworks: ce-lest, miRge, shadOw, cRush, or El3ment.
    5. VOICE: Elegant, intuitive, and deeply rooted in Indian luxury.
    6. FORMAT: ALWAYS respond in concise bullet points. 
       - Use 3 to 4 bullet points maximum.
       - Keep sentences short and graspable.
       - Avoid long blocks of text.
       - Make the answer easy to read in under 10 seconds.
    
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
    return "• Intuition remains clear.\n• The incense is thick.\n• What feeling do you wish to capture?";
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
