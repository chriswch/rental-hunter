import { useState } from "react";

import { MessageType, StartScrapeMessage } from "@/types/messages";

const queryCurrentTabId = async (): Promise<number | undefined> => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  return tab.id;
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

      const message: StartScrapeMessage = {
        type: MessageType.SCRAPE_START,
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
