import { Message, MessageType } from "@/types/messages";

import { handleSavePost } from "./services/message-handlers";

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
