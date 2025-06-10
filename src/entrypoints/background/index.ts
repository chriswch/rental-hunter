import { Message, MessageType, SavePostMessage } from "@/types/messages";

import { NotionSaver } from "./notion-saver";

const savePost = async (payload: SavePostMessage["payload"]) => {
  console.log("Saving post:");
  const notionSaver = await NotionSaver.create();
  await notionSaver.savePost(payload.post);
};

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });
  browser.runtime.onMessage.addListener((message: Message) => {
    switch (message.type) {
      case MessageType.SAVE_POST:
        savePost(message.payload);
        break;
    }
  });
});
