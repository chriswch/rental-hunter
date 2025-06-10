import { storage } from "#imports";

export const notionApiKey = storage.defineItem<string>("local:notionApiKey", {
  fallback: "",
});
export const notionDatabaseId = storage.defineItem<string>(
  "local:notionDatabaseId",
  {
    fallback: "",
  },
);
