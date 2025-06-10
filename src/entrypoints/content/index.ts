import { Message, MessageType, StartScrapeMessage } from "@/types/messages";

import { scrapePosts } from "./scraper";

const handleScrapeStart = (payload: StartScrapeMessage["payload"]) => {
  console.log("Scraping started.");
  scrapePosts(payload.numPosts);
};

export default defineContentScript({
  matches: ["*://*.facebook.com/*"],
  main() {
    browser.runtime.onMessage.addListener((message: Message) => {
      switch (message.type) {
        case MessageType.SCRAPE_START:
          handleScrapeStart(message.payload);
          break;
        default:
          break;
      }
    });
    console.log("Content script loaded.");
  },
});
