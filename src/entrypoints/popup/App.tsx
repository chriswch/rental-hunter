import {
  Button,
  Card,
  CardBody,
  Form,
  Input,
  NumberInput,
  Spacer,
  Tab,
  Tabs,
} from "@heroui/react";
import { useState } from "react";

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

const handleNotionIntegration = () => {
  console.log("Notion integration");
};

function App() {
  const [numPosts, setNumPosts] = useState(10);
  const [notionApiKey, setNotionApiKey] = useState("");
  const [notionDatabaseId, setNotionDatabaseId] = useState("");

  return (
    <>
      <div className="min-w-80">
        <div className="container mx-auto px-4 py-2">
          {/* Header */}
          <div className="flex flex-row justify-center gap-2">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <span className="text-xl font-bold text-white">FB</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Scraper
            </h1>
          </div>

          <Spacer y={6} />

          {/* Panels */}
          <Tabs fullWidth size="sm" variant="bordered" aria-label="Options">
            {/* Control Panel */}
            <Tab key="scraper" title="Scraper">
              <Card>
                <CardBody>
                  <Form>
                    <NumberInput
                      label="Number of Posts to Scrape"
                      name="numPosts"
                      value={numPosts}
                      onValueChange={setNumPosts}
                      isRequired
                      min={1}
                      max={100}
                      errorMessage="Please enter a valid number"
                      hideStepper
                      isWheelDisabled
                      variant="bordered"
                      radius="sm"
                    ></NumberInput>
                  </Form>

                  <Spacer y={2} />

                  <Button color="primary" size="sm" onPress={handleScrapeStart}>
                    <div className="text-sm">Start scraping</div>
                  </Button>
                </CardBody>
              </Card>
            </Tab>
            {/* Settings Panel */}
            <Tab key="settings" title="Settings">
              <Card>
                <CardBody>
                  <div className="flex flex-row items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">N</span>
                    </div>
                    <h2 className="text-sm font-bold">Notion Integration</h2>
                  </div>

                  <Spacer y={2} />

                  <Form>
                    <Input
                      label="Notion API Key"
                      name="notionApiKey"
                      value={notionApiKey}
                      onValueChange={setNotionApiKey}
                      isRequired
                      variant="bordered"
                      radius="sm"
                    ></Input>
                    <Input
                      label="Notion Database ID"
                      name="notionDatabaseId"
                      value={notionDatabaseId}
                      onValueChange={setNotionDatabaseId}
                      isRequired
                      variant="bordered"
                      radius="sm"
                    ></Input>
                    <Button
                      fullWidth
                      color="secondary"
                      size="sm"
                      onPress={handleNotionIntegration}
                    >
                      <div className="text-sm">Save</div>
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default App;
