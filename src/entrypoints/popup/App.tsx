import { Spacer, Tab, Tabs } from "@heroui/react";

import { Header } from "./components/Header";
import { ScraperTab } from "./components/ScraperTab";
import { SettingsTab } from "./components/SettingsTab";

function App() {
  return (
    <>
      <div className="min-w-80">
        <div className="container mx-auto px-4 py-2">
          {/* Header */}
          <Header />

          <Spacer y={6} />

          {/* Panels */}
          <Tabs fullWidth size="sm" variant="bordered" aria-label="Options">
            {/* Control Panel */}
            <Tab key="scraper" title="Scraper">
              <ScraperTab />
            </Tab>
            {/* Settings Panel */}
            <Tab key="settings" title="Settings">
              <SettingsTab />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default App;
