import { Post } from "@/types/posts";
import { geminiApiKey as geminiApiKeyStorage } from "@/utils/storage";

import { AnalyzedRentalInfo } from "../../types";
import { rentalInfoSystemPrompt } from "./constants/prompts";

const parseJsonLoose = (raw: string): AnalyzedRentalInfo | null => {
  try {
    return JSON.parse(raw) as AnalyzedRentalInfo;
  } catch (e) {
    const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
    const match = raw.match(jsonRegex);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1].trim()) as AnalyzedRentalInfo;
      } catch (err) {
        console.error("Error parsing fenced JSON:", err);
        return null;
      }
    }

    console.error("Error parsing JSON:", e, "raw:", raw);
    return null;
  }
};

const setDefaultRentalInfo = (
  rentalInfo: AnalyzedRentalInfo,
): AnalyzedRentalInfo => {
  const { nearby_mrt_stations } = rentalInfo;

  return {
    ...rentalInfo,
    nearby_mrt_stations: nearby_mrt_stations || [],
  };
};

const parseRentalInfo = (content: string): AnalyzedRentalInfo | null => {
  const rentalInfo = parseJsonLoose(content);
  if (rentalInfo) {
    return setDefaultRentalInfo(rentalInfo);
  }
  return null;
};

const geminiAnalyze = async (apiKey: string, post: Post) => {
  const baseUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent";
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    system_instruction: {
      parts: [
        {
          text: rentalInfoSystemPrompt,
        },
      ],
    },
    contents: [
      {
        parts: [
          {
            text: `Here is the text to extract information from: ${post.content}`,
          },
        ],
      },
    ],
  };

  const response = await fetch(`${baseUrl}?key=${apiKey}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const data = await response.json();
  const content = data.candidates[0].content.parts[0].text;
  console.log("Gemini response content:", content);

  return content;
};

export const analyzeRentalInfo = async (
  post: Post,
): Promise<AnalyzedRentalInfo | undefined> => {
  const geminiApiKey = await geminiApiKeyStorage.getValue();
  if (!geminiApiKey) {
    console.error("Gemini API key not found");
    return;
  }

  const content = await geminiAnalyze(geminiApiKey, post);
  const rentalInfo = parseRentalInfo(content);
  if (rentalInfo) return rentalInfo;
};
