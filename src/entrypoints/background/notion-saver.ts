import { Post } from "@/types/posts";
import { notionApiKey, notionDatabaseId } from "@/utils/storage";

export class NotionSaver {
  private baseUrl: string;
  private headers: Record<string, string>;
  private fbPostsDatabaseId: string;

  constructor(apiKey: string, databaseId: string) {
    this.baseUrl = "https://api.notion.com/v1";
    this.headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    };
    this.fbPostsDatabaseId = databaseId;
  }

  static async create(): Promise<NotionSaver> {
    const [apiKey, databaseId] = await Promise.all([
      notionApiKey.getValue(),
      notionDatabaseId.getValue(),
    ]);
    return new NotionSaver(apiKey, databaseId);
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
