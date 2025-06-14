import { baseUrl, buildRequestHeaders } from "./base";

const updatePost = async (notionPageId: string, rentalInfo: object) => {
  const headers = await buildRequestHeaders();

  try {
    await fetch(`${baseUrl}/pages/${notionPageId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        properties: rentalInfo,
      }),
    });
  } catch (error) {
    console.error("Error updating post to Notion:", error);
  }
};

export default updatePost;
