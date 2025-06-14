import {
  Button,
  Card,
  CardBody,
  Form,
  NumberInput,
  Progress,
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

        <>
          <Progress
            size="sm"
            radius="sm"
            className="max-w-md"
            color="secondary"
            classNames={{
              track: "drop-shadow-md border border-default",
              value: "text-foreground/60",
            }}
            label="Scraping Progress"
            value={(3 / numPosts) * 100}
            showValueLabel={true}
            formatOptions={{
              style: "unit",
              unit: "percent",
              minimumFractionDigits: 0,
              maximumFractionDigits: 1,
            }}
          />
          <div className="text-xs text-default-500 mt-1">
            {3} of {numPosts} posts scraped
          </div>
          <Spacer y={2} />
        </>

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
