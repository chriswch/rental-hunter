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

/* Session storage items */

export const scrapedPostCount = storage.defineItem<number>(
  "session:scrapedPostCount",
  {
    fallback: 0,
  },
);
