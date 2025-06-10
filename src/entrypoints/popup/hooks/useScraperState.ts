import { useState } from "react";

import { MessageType, StartScrapeMessage } from "@/types/messages";
import {
  notionApiKey as notionApiKeyStorage,
  notionDatabaseId as notionDatabaseIdStorage,
} from "@/utils/storage";

const queryCurrentTabId = async (): Promise<number | undefined> => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  return tab.id;
};

const validateNotionSettings = async (): Promise<boolean> => {
  const [notionApiKey, notionDatabaseId] = await Promise.all([
    notionApiKeyStorage.getValue(),
    notionDatabaseIdStorage.getValue(),
  ]);
  return !!notionApiKey && !!notionDatabaseId;
};

export function useScraperState() {
  const [numPosts, setNumPosts] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleScrapeStart = async () => {
    try {
      setIsLoading(true);
      const tabId = await queryCurrentTabId();
      if (!tabId) {
        console.error("No active tab found");
        return;
      }

      const isValid = await validateNotionSettings();
      if (!isValid) {
        console.error("No Notion API key or database ID found");
        return;
      }

      const message: StartScrapeMessage = {
        type: MessageType.SCRAPE_START,
        payload: {
          numPosts,
        },
      };

      await browser.tabs.sendMessage(tabId, message);
    } catch (error) {
      console.error("Failed to start scraping:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    numPosts,
    setNumPosts,
    isLoading,
    handleScrapeStart,
  };
}
