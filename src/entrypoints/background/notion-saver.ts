import { Post } from "@/types/posts";

export class NotionSaver {
  private baseUrl: string;
  private headers: Record<string, string>;
  private fbPostsDatabaseId: string;

  constructor() {
    this.baseUrl = "https://api.notion.com/v1";
    this.headers = {
      Authorization: `Bearer ${import.meta.env.WXT_NOTION_API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    };
    this.fbPostsDatabaseId = `${import.meta.env.WXT_NOTION_DATABASE_ID}`;
  }

  private async saveToNotion(post: Post) {
    await fetch(`${this.baseUrl}/pages`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        parent: { type: "database_id", database_id: this.fbPostsDatabaseId },
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
      }),
    });
  }

  async savePost(post: Post) {
    try {
      await this.saveToNotion(post);
    } catch (error) {
      console.error("Error saving fb posts to Notion:", error);
    }
  }
}
