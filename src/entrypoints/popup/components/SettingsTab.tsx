import { Button, Card, CardBody, Form, Input, Spacer } from "@heroui/react";
import { useEffect } from "react";

import { useSettingsState } from "../hooks/useSettingsState";

export function SettingsTab() {
  const {
    notionApiKey,
    setNotionApiKey,
    notionDatabaseId,
    setNotionDatabaseId,
    isLoading,
    handleNotionIntegration,
    loadSettings,
  } = useSettingsState();

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <Card>
      <CardBody>
        <div className="flex flex-row items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <h2 className="text-sm font-bold">Notion Integration</h2>
        </div>

        <Spacer y={2} />

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleNotionIntegration();
          }}
        >
          <Input
            label="Notion API Key"
            name="notionApiKey"
            value={notionApiKey}
            onValueChange={setNotionApiKey}
            isRequired
            variant="bordered"
            radius="sm"
            type="password"
          />
          <Input
            label="Notion Database ID"
            name="notionDatabaseId"
            value={notionDatabaseId}
            onValueChange={setNotionDatabaseId}
            isRequired
            variant="bordered"
            radius="sm"
          />
          <Button
            fullWidth
            color="secondary"
            size="sm"
            isLoading={isLoading}
            isDisabled={isLoading}
            type="submit"
          >
            <div className="text-sm">{isLoading ? "Saving..." : "Save"}</div>
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
