import { Post } from "@/types/posts";

import { buildRequestHeaders, getDatabaseId } from "./base";

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
      price: {
        number: post.price,
      },
    },
  };
};

const createPost = async (post: Post) => {
  try {
    const baseUrl = "https://api.notion.com/v1";
    const headers = await buildRequestHeaders();
    const body = await buildRequestBody(post);

    const response = await fetch(`${baseUrl}/pages`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const responseBody: {
      id: string;
    } = await response.json();

    return responseBody.id;
  } catch (error) {
    console.error("Error creating post to Notion:", error);
  }
};

export default createPost;
