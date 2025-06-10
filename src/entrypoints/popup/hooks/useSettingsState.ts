import { useState } from "react";

import {
  notionApiKey as notionApiKeyStorage,
  notionDatabaseId as notionDatabaseIdStorage,
} from "@/utils/storage";

export function useSettingsState() {
  const [notionApiKey, setNotionApiKey] = useState("");
  const [notionDatabaseId, setNotionDatabaseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNotionIntegration = async () => {
    try {
      setIsLoading(true);
      await notionApiKeyStorage.setValue(notionApiKey);
      await notionDatabaseIdStorage.setValue(notionDatabaseId);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load settings on hook initialization
  const loadSettings = async () => {
    try {
      const [notionApiKeyFromStorage, notionDatabaseIdFromStorage] =
        await Promise.all([
          notionApiKeyStorage.getValue(),
          notionDatabaseIdStorage.getValue(),
        ]);
      setNotionApiKey(notionApiKeyFromStorage);
      setNotionDatabaseId(notionDatabaseIdFromStorage);
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  return {
    notionApiKey,
    setNotionApiKey,
    notionDatabaseId,
    setNotionDatabaseId,
    isLoading,
    handleNotionIntegration,
    loadSettings,
  };
}
