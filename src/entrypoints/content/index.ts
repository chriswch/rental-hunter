import { Message, MessageType } from "@/types/messages";

import { scrapePosts } from "./scraper";

const handleScrapeStart = () => {
  console.log("Scraping started.");
  scrapePosts();
};

export default defineContentScript({
  matches: ["*://*.facebook.com/*"],
  main() {
    browser.runtime.onMessage.addListener((message: Message) => {
      switch (message.type) {
        case MessageType.SCRAPE_START:
          handleScrapeStart();
          break;
        default:
          break;
      }
    });
    console.log("Content script loaded.");
  },
});
