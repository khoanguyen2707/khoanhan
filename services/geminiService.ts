
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLoveLetter = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Hãy viết một lời tỏ tình siêu ngọt ngào, lãng mạn và chân thành bằng tiếng Việt dành cho người yêu. Lời nhắn nên ngắn gọn (khoảng 2-3 câu), ấm áp và khiến họ cảm thấy đặc biệt vì đã chọn mình.",
      config: {
        temperature: 0.9,
        topP: 0.95,
      },
    });

    return response.text || "Anh biết là em sẽ chọn anh mà. Cảm ơn em đã bước vào cuộc đời anh, biến mọi khoảnh khắc trở nên rực rỡ và đầy ý nghĩa. Anh yêu em!";
  } catch (error) {
    console.error("Error generating love letter:", error);
    return "Cảm ơn em đã chọn anh. Anh hứa sẽ luôn ở bên cạnh, chăm sóc và yêu thương em bằng tất cả trái tim mình. ❤️";
  }
};
