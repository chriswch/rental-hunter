import { useState } from "react";

import { geminiApiKey as geminiApiKeyStorage } from "@/utils/storage";

export function useGeminiSettings() {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSaveSettings = async () => {
    try {
      setIsLoading(true);
      await geminiApiKeyStorage.setValue(apiKey);
    } catch (error) {
      console.error("Failed to save gemini settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSettings = async () => {
    const apiKeyFromStorage = await geminiApiKeyStorage.getValue();
    setApiKey(apiKeyFromStorage);
  };

  return {
    apiKey,
    setApiKey,
    isLoading,
    onSaveSettings,
    loadSettings,
  };
}
