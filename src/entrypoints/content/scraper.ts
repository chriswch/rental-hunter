import { MessageType, SavePostMessage } from "@/types/messages";
import type { Post } from "@/types/posts";

import { scrollToPageEnd } from "./human-behavior";
import { parsePostData } from "./parser";
import {
  FEED_CONTAINER_SELECTOR,
  POST_ROOT_SELECTOR,
} from "./providers/facebook/selectors";

const getFeedContainer = (): HTMLElement | null => {
  const feedContainer = document.querySelector(FEED_CONTAINER_SELECTOR);
  if (!feedContainer) {
    console.log("Feed container not found");
    return null;
  }
  return feedContainer as HTMLElement;
};

const getPostElements = (feedContainer: HTMLElement): HTMLElement[] => {
  return Array.from(
    feedContainer.querySelectorAll(POST_ROOT_SELECTOR),
  ) as HTMLElement[];
};

const savePost = (post: Post) => {
  const message: SavePostMessage = {
    type: MessageType.SAVE_POST,
    payload: {
      post,
    },
  };

  browser.runtime.sendMessage(message);
};

// Main scraping function
export const scrapePosts = async (maxPosts: number = 10) => {
  const feedContainer = getFeedContainer();
  if (!feedContainer) {
    console.log("Feed container not found");
    return;
  }

  try {
    let savedPostsCount = 0;
    let nextPostElementIndex = 0;
    while (savedPostsCount < maxPosts) {
      let currentPostElements = getPostElements(feedContainer);

      while (savedPostsCount < maxPosts) {
        if (nextPostElementIndex === currentPostElements.length) {
          console.log("Loading more posts");
          await scrollToPageEnd();
          currentPostElements = getPostElements(feedContainer);

          if (nextPostElementIndex === currentPostElements.length) {
            console.log("No more posts found");
            return;
          }
        }

        const nextPostElement = currentPostElements[nextPostElementIndex];
        const postData = await parsePostData(nextPostElement);
        if (postData) {
          savePost(postData);
          savedPostsCount += 1;
        }

        nextPostElementIndex += 1;
      }
    }
  } catch (error) {
    console.error(error);
  }
};
