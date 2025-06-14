import { Message, MessageType, SavePostMessage } from "@/types/messages";

import { savePostToNotion } from "./notion-saver";

const handleSavePost = async (payload: SavePostMessage["payload"]) => {
  console.log("Saving post:");
  await savePostToNotion(payload.post);
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
