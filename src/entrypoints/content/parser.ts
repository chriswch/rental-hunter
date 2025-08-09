import { Post } from "@/types/posts";

import { clickElement, scrollToPostElement } from "./human-behavior";

// Check if the element is a post element
export const isPostElement = (element: Element): boolean => {
  return element.querySelector("[aria-posinset]") !== null;
};

// Handle "Show more" button if present
const handleShowMoreButton = async (
  postElement: HTMLElement,
): Promise<void> => {
  const buttons = Array.from(
    postElement.querySelectorAll('div[role="button"]'),
  );
  for (const button of buttons) {
    if (button.textContent?.trim() === "查看更多") {
      await clickElement(button as HTMLElement);
      break;
    }
  }
};

// Handle content parsing
const parseContent = (postElement: HTMLElement) => {
  let contentPrefix = "";
  let messageElement = postElement.querySelector(
    'div[data-ad-rendering-role="story_message"]',
  );

  // translated content
  if (!messageElement) {
    contentPrefix = "[TRANSLATED] ";
    messageElement = postElement.querySelector(
      'blockquote[class="html-blockquote xexx8yu x18d9i69 x12u81az x1t7ytsu x56jcm7 x14z9mp xieb3on x1gslohp xv54qhq xf7dkkf xyqm7xq"]',
    );
  }

  return contentPrefix + (messageElement?.textContent?.trim() || "");
};

const parsePrice = (postElement: HTMLElement): number | null => {
  const container = postElement.querySelector(
    'span[class="html-span xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1hl2dhg x16tdsg8 x1vvkbs xtvhhri"]',
  );
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
    const authorElement = postElement.querySelector(
      'div[data-ad-rendering-role="profile_name"]',
    );
    const author = authorElement?.textContent?.trim() || "";

    // Extract timestamp
    const timestamp = "";

    // Extract price
    const price = parsePrice(postElement);

    // Extract image links
    const image_urls: string[] = [];
    const imageAnchors = postElement.querySelectorAll(
      "a[aria-label][attributionsrc]",
    );
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
