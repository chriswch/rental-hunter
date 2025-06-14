import { Card, CardBody } from "@heroui/react";

import { NotionSettings } from "./settings-tab/notion-settings";

export function SettingsTab() {
  return (
    <Card>
      <CardBody className="flex flex-col gap-5">
        <NotionSettings />
      </CardBody>
    </Card>
  );
}
