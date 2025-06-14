import { Button, Form, Input, Spacer } from "@heroui/react";
import { useEffect } from "react";

import { useGeminiSettings } from "@/entrypoints/popup/hooks/settings-tab/useGeminiSettings";

export function GeminiSettings() {
  const { apiKey, setApiKey, isLoading, onSaveSettings, loadSettings } =
    useGeminiSettings();

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center gap-2">
        <div className="w-6 h-6 bg-gradient-to-tr from-blue-500 to-purple-300 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">G</span>
        </div>
        <h2 className="text-sm font-bold">Gemini Integration</h2>
      </div>

      <Spacer y={2} />

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSaveSettings();
        }}
      >
        <Input
          label="Gemini API Key"
          name="geminiApiKey"
          value={apiKey}
          onValueChange={setApiKey}
          isRequired
          variant="bordered"
          radius="sm"
          type="password"
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
    </div>
  );
}
