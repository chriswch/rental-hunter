import { Post } from "@/types/posts";

import { expandPostIfCollapsed, scrollToPostElement } from "./human-behavior";
import {
  IMAGE_ANCHOR_SELECTOR,
  POST_ROOT_SELECTOR,
  PRICE_CONTAINER_SELECTOR,
  PROFILE_NAME_SELECTOR,
  STORY_MESSAGE_SELECTOR,
  TRANSLATED_BLOCKQUOTE_SELECTOR,
} from "./providers/facebook/selectors";

// Check if the element is a post element
export const isPostElement = (element: Element): boolean => {
  return element.matches(POST_ROOT_SELECTOR);
};

// Handle "Show more" button if present
const handleShowMoreButton = async (postElement: HTMLElement): Promise<void> => {
  await expandPostIfCollapsed(postElement);
};

// Handle content parsing
const parseContent = (postElement: HTMLElement) => {
  let contentPrefix = "";
  let messageElement = postElement.querySelector(STORY_MESSAGE_SELECTOR);

  // translated content
  if (!messageElement) {
    contentPrefix = "[TRANSLATED] ";
    messageElement = postElement.querySelector(TRANSLATED_BLOCKQUOTE_SELECTOR);
  }

  return contentPrefix + (messageElement?.textContent?.trim() || "");
};

const parsePrice = (postElement: HTMLElement): number | null => {
  const container = postElement.querySelector(PRICE_CONTAINER_SELECTOR);
  if (!container) return null;
  
  const div = container.querySelector('div');
  if (!div) return null;

  const first = div.firstChild;
  if (first instanceof Text) {
    const raw = first.data.trim();
    if (raw.startsWith("NT$")) {
      const price = raw.slice(3).trim().replace(/,/g, ""); // Removes all commas
      return parseFloat(price);
    }
  }
  return null;
};

// Extract post data from the element
export const parsePostData = async (
  postElement: HTMLElement,
): Promise<Post | null> => {
  try {
    const id = "";
    const link = `https://www.facebook.com/groups/${id}`;

    // Scroll to the post element
    await scrollToPostElement(postElement);
    // Handle "Show more" button if present
    await handleShowMoreButton(postElement);
    // Scroll to the post element again to make sure the content is fully loaded
    await scrollToPostElement(postElement);

    // Extract text content
    const content = parseContent(postElement);

    // Extract author
    const authorElement = postElement.querySelector(PROFILE_NAME_SELECTOR);
    const author = authorElement?.textContent?.trim() || "";

    // Extract timestamp
    const timestamp = "";

    // Extract price
    const price = parsePrice(postElement);

    // Extract image links
    const image_urls: string[] = [];
    const imageAnchors = postElement.querySelectorAll(IMAGE_ANCHOR_SELECTOR);
    imageAnchors.forEach((anchor) => {
      const img = anchor.querySelector("img");
      if (img && img.src) {
        image_urls.push(img.src);
      }
    });

    return {
      id,
      link,
      content,
      author,
      timestamp,
      image_urls,
      price,
    };
  } catch (error) {
    console.error("Error extracting post data:", error);
    return null;
  }
};
