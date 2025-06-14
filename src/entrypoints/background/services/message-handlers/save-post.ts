import { SavePostMessage } from "@/types/messages";
import { scrapedPostCount as scrapePostCountStorage } from "@/utils/storage";

import { createPost } from "../notion";

const updateScrapedPostCount = async () => {
  const currentCount = await scrapePostCountStorage.getValue();
  await scrapePostCountStorage.setValue(currentCount + 1);
};

const handleSavePost = async (payload: SavePostMessage["payload"]) => {
  const notionPageId = await createPost(payload.post);
  await updateScrapedPostCount();
};

export default handleSavePost;
