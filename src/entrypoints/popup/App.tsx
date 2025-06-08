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
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={handleScrapeStart}>Start scraping</button>
    </>
  );
}

export default App;
