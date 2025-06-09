import { Button } from "@heroui/react";

import { MessageType, StartScrapeMessage } from "@/types/messages";

const queryCurrentTabId = async (): Promise<number | undefined> => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  return tab.id;
};

const handleScrapeStart = async () => {
  const tabId = await queryCurrentTabId();
  if (!tabId) {
    return;
  }

  const message: StartScrapeMessage = {
    type: MessageType.SCRAPE_START,
  };

  browser.tabs.sendMessage(tabId, message);
};

function App() {
  return (
    <>
      <Button
        color="primary"
        size="sm"
        variant="bordered"
        onPress={handleScrapeStart}
      >
        Start scraping
      </Button>
    </>
  );
}

export default App;
