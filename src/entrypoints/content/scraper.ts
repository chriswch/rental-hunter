import { MessageType, SavePostMessage } from "@/types/messages";
import type { Post } from "@/types/posts";

import { scrollToPageEnd } from "./human-behavior";
import { parsePostData } from "./parser";

const getFeedContainer = (): HTMLElement | null => {
  const feedContainer = document.querySelector('div[role="feed"]');
  if (!feedContainer) {
    console.log("Feed container not found");
    return null;
  }
  return feedContainer as HTMLElement;
};

const getTargetPostElement = (
  feedContainer: HTMLElement,
  position: number,
): HTMLElement | null => {
  return feedContainer.querySelector(
    `[aria-posinset="${position}"]`,
  ) as HTMLElement | null;
};

const getPostElement = async (
  position: number,
): Promise<HTMLElement | null> => {
  const feedContainer = getFeedContainer();
  if (!feedContainer) {
    return null;
  }

  let postElement = getTargetPostElement(feedContainer, position);

  if (!postElement) {
    console.log("Post element not found, scrolling to page end");
    await scrollToPageEnd();
    postElement = getTargetPostElement(feedContainer, position);
  }

  if (!postElement) {
    console.log("Post element still not found");
    return null;
  } else {
    console.log("Post element found");
    return postElement as HTMLElement | null;
  }
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
  const posts: Post[] = [];

  const feedContainer = getFeedContainer();
  if (!feedContainer) {
    return;
  }

  try {
    while (posts.length < maxPosts) {
      const nextPostElement = await getPostElement(posts.length + 1);
      if (!nextPostElement) {
        console.log("No more posts found");
        break;
      }
      const postData = await parsePostData(nextPostElement);
      if (postData) {
        savePost(postData);

        posts.push(postData);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
