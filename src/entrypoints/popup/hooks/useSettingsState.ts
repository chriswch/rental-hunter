import { useState } from "react";

export function useSettingsState() {
  const [notionApiKey, setNotionApiKey] = useState("");
  const [notionDatabaseId, setNotionDatabaseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNotionIntegration = async () => {
    try {
      setIsLoading(true);
      console.log("Notion integration", { notionApiKey, notionDatabaseId });
      // TODO: Implement Notion integration logic
      console.log("Settings saved successfully");
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load settings on hook initialization
  const loadSettings = async () => {
    try {
      console.log("Loading settings");
      // TODO: Implement loading settings from storage
      console.log("Settings loaded successfully");
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
