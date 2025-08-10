import { notionApiKey, notionDatabaseId } from "@/utils/storage";

export const baseUrl = "https://api.notion.com/v1";

const getApiKey = async () => {
  return await notionApiKey.getValue();
};

const getDatabaseId = async () => {
  return await notionDatabaseId.getValue();
};

const buildRequestHeaders = async () => {
  const apiKey = await getApiKey();
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28",
  };
};

export { getDatabaseId, buildRequestHeaders };
