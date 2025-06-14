import { Message, MessageType, SavePostMessage } from "@/types/messages";
import { scrapedPostCount as scrapePostCountStorage } from "@/utils/storage";

import { savePostToNotion } from "./notion-saver";

const handleSavePost = async (payload: SavePostMessage["payload"]) => {
  await savePostToNotion(payload.post);

  const currentCount = await scrapePostCountStorage.getValue();
  await scrapePostCountStorage.setValue(currentCount + 1);
};

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });
  browser.runtime.onMessage.addListener((message: Message) => {
    switch (message.type) {
      case MessageType.SAVE_POST:
        handleSavePost(message.payload);
        break;
    }
  });
});
