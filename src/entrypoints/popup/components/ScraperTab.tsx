import {
  Button,
  Card,
  CardBody,
  Form,
  NumberInput,
  Progress,
} from "@heroui/react";

import { useScraperState } from "../hooks/useScraperState";

export function ScraperTab() {
  const {
    totalPostsToScrape,
    setTotalPostsToScrape,
    isScraping,
    scrapedPostCount,
    handleScrapeStart,
  } = useScraperState();

  return (
    <Card>
      <CardBody>
        <Form>
          <NumberInput
            label="Number of Posts to Scrape"
            name="numPosts"
            value={totalPostsToScrape}
            onValueChange={setTotalPostsToScrape}
            isRequired
            min={1}
            max={100}
            errorMessage="Please enter a valid number"
            hideStepper
            isWheelDisabled
            variant="bordered"
            radius="sm"
          />

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
              value={(scrapedPostCount / totalPostsToScrape) * 100}
              showValueLabel={true}
              formatOptions={{
                style: "unit",
                unit: "percent",
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              }}
            />
            {/* <div className="text-xs text-default-500">
              {scrapedPostCount} of {totalPostsToScrape} posts scraped
            </div> */}
          </>

          <Button
            color="primary"
            className="w-full"
            size="sm"
            onPress={handleScrapeStart}
            isLoading={isScraping}
            isDisabled={isScraping}
          >
            <div className="text-sm">
              {isScraping
                ? `${scrapedPostCount} of ${totalPostsToScrape} posts scraped`
                : "Start scraping"}
            </div>
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
