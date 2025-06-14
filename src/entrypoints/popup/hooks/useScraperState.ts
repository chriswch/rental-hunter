import { useEffect, useState } from "react";

import { MessageType, StartScrapeMessage } from "@/types/messages";
import {
  notionApiKey as notionApiKeyStorage,
  notionDatabaseId as notionDatabaseIdStorage,
  scrapedPostCount as scrapedPostCountStorage,
  totalPostsToScrape as totalPostsToScrapeStorage,
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
  const [totalPostsToScrape, setTotalPostsToScrapeState] = useState(0);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapedPostCount, setScrapedPostCount] = useState(0);

  useEffect(() => {
    totalPostsToScrapeStorage.getValue().then((value) => {
      setTotalPostsToScrapeState(value);
    });
    scrapedPostCountStorage.getValue().then((value) => {
      setScrapedPostCount(value);
    });

    const unsubscribeScrapedPostCount = scrapedPostCountStorage.watch(
      async (newValue) => {
        setScrapedPostCount(newValue);
        const totalPostsToScrapeValue =
          await totalPostsToScrapeStorage.getValue();

        if (newValue === totalPostsToScrapeValue) {
          setIsScraping(false);
        }
      },
    );

    return () => {
      unsubscribeScrapedPostCount();
    };
  }, []);

  const setTotalPostsToScrape = async (value: number) => {
    setTotalPostsToScrapeState(value);
    await totalPostsToScrapeStorage.setValue(value);
  };

  const handleScrapeStart = async () => {
    try {
      setIsScraping(true);
      await scrapedPostCountStorage.setValue(0);

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
          numPosts: totalPostsToScrape,
        },
      };

      await browser.tabs.sendMessage(tabId, message);
    } catch (error) {
      console.error("Failed to start scraping:", error);
    }
  };

  return {
    totalPostsToScrape,
    setTotalPostsToScrape,
    isScraping,
    scrapedPostCount,
    handleScrapeStart,
  };
}
