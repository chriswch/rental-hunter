import { Button, Card, CardBody, Tab, Tabs } from "@heroui/react";

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
      <div className="min-w-40">
        <div className="container mx-auto px-4 py-2">
          {/* Header */}
          <div className="flex flex-row justify-center gap-2 mb-4">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <span className="text-xl font-bold text-white">FB</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Scraper
            </h1>
          </div>

          {/*  */}
          <Tabs size="sm" variant="bordered" aria-label="Options">
            <Tab key="scraper" title="Scraper">
              <Card>
                <CardBody>
                  <Button
                    color="primary"
                    size="sm"
                    variant="bordered"
                    onPress={handleScrapeStart}
                  >
                    Start scraping
                  </Button>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="settings" title="Settings">
              <Card>
                <CardBody></CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default App;
