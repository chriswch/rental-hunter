import { useState } from "react";

import {
  notionApiKey as notionApiKeyStorage,
  notionDatabaseId as notionDatabaseIdStorage,
} from "@/utils/storage";

export function useNotionSettings() {
  const [apiKey, setApiKey] = useState("");
  const [databaseId, setDatabaseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSaveSettings = async () => {
    try {
      setIsLoading(true);
      await notionApiKeyStorage.setValue(apiKey);
      await notionDatabaseIdStorage.setValue(databaseId);
    } catch (error) {
      console.error("Failed to save notion settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load settings on hook initialization
  const loadSettings = async () => {
    try {
      const [apiKeyFromStorage, databaseIdFromStorage] = await Promise.all([
        notionApiKeyStorage.getValue(),
        notionDatabaseIdStorage.getValue(),
      ]);
      setApiKey(apiKeyFromStorage);
      setDatabaseId(databaseIdFromStorage);
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  return {
    apiKey,
    setApiKey,
    databaseId,
    setDatabaseId,
    isLoading,
    onSaveSettings,
    loadSettings,
  };
}
