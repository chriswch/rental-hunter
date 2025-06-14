import { storage } from "#imports";

/* Local storage items */

export const notionApiKey = storage.defineItem<string>("local:notionApiKey", {
  fallback: "",
});
export const notionDatabaseId = storage.defineItem<string>(
  "local:notionDatabaseId",
  {
    fallback: "",
  },
);

export const geminiApiKey = storage.defineItem<string>("local:geminiApiKey", {
  fallback: "",
});

/* Session storage items */

export const totalPostsToScrape = storage.defineItem<number>(
  "session:totalPostsToScrape",
  {
    fallback: 10,
  },
);

export const scrapedPostCount = storage.defineItem<number>(
  "session:scrapedPostCount",
  {
    fallback: 0,
  },
);
