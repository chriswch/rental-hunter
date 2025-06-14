import { Card, CardBody } from "@heroui/react";

import { GeminiSettings, NotionSettings } from "./settings-tab";

export function SettingsTab() {
  return (
    <Card>
      <CardBody className="flex flex-col gap-5">
        <NotionSettings />
        <GeminiSettings />
      </CardBody>
    </Card>
  );
}
