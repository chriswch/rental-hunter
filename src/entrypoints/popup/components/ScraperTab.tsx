import {
  Button,
  Card,
  CardBody,
  Form,
  NumberInput,
  Spacer,
} from "@heroui/react";

import { useScraperState } from "../hooks/useScraperState";

export function ScraperTab() {
  const { numPosts, setNumPosts, isLoading, handleScrapeStart } =
    useScraperState();

  return (
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
          />
        </Form>

        <Spacer y={2} />

        <Button
          color="primary"
          size="sm"
          onPress={handleScrapeStart}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          <div className="text-sm">
            {isLoading ? "Scraping..." : "Start scraping"}
          </div>
        </Button>
      </CardBody>
    </Card>
  );
}
