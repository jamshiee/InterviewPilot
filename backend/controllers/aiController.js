import { GoogleGenAI } from "@google/genai";
import {
  
  questionAnswerPrompt,
} from "../utils/prompts.js";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus , numberofQuestions } =
      req.body;

    if (!role || !experience || !topicsToFocus || !numberofQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberofQuestions
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};
