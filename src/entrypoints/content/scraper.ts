import { MessageType, SavePostMessage } from "@/types/messages";
import type { Post } from "@/types/posts";

import { scrollToPageEnd } from "./human-behavior";
import { parsePostData } from "./parser";

// Facebook post root element selector
const POST_ROOT_SELECTOR = "div.x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z";

const getFeedContainer = (): HTMLElement | null => {
  const feedContainer = document.querySelector('div[role="feed"]');
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
