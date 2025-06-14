import { Post } from "@/types/posts";
import { notionApiKey, notionDatabaseId } from "@/utils/storage";

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

const buildRequestBody = async (post: Post) => {
  const databaseId = await getDatabaseId();
  return {
    parent: { type: "database_id", database_id: databaseId },
    properties: {
      title: {
        type: "title",
        title: [{ type: "text", text: { content: "" } }],
      },
      author: {
        rich_text: [{ type: "text", text: { content: post.author } }],
      },
      content: {
        type: "rich_text",
        rich_text: [{ type: "text", text: { content: post.content } }],
      },
      image_urls: {
        type: "rich_text",
        rich_text: post.image_urls.map((url: string) => ({
          type: "text",
          text: { content: url },
        })),
      },
    },
  };
};

export async function savePostToNotion(post: Post) {
  try {
    const baseUrl = "https://api.notion.com/v1";
    const headers = await buildRequestHeaders();
    const body = await buildRequestBody(post);

    await fetch(`${baseUrl}/pages`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Error saving fb posts to Notion:", error);
  }
}
