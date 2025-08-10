const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = async (min: number, max: number) => {
  const delayMs = Math.floor(Math.random() * (max - min + 1)) + min;
  await delay(delayMs);
};

export const scrollToPostElement = async (element: HTMLElement) => {
  console.log("Scrolling to element:", element);

  element.scrollIntoView({ behavior: "smooth", block: "center" });
  await randomDelay(500, 800);
};

export const scrollToPageEnd = async () => {
  const scrollHeight = document.documentElement.scrollHeight;
  window.scrollTo(0, scrollHeight);
  await randomDelay(1000, 2000);
};

export const clickElement = async (element: HTMLElement) => {
  element.click();
  await randomDelay(1000, 2000); // Wait a bit to take effect
};

export const expandPostIfCollapsed = async (postElement: HTMLElement) => {
  const buttons = Array.from(postElement.querySelectorAll('div[role="button"]'));
  for (const button of buttons) {
    const text = button.textContent?.trim();
    if (!text) continue;
    // Handle common "Show more" texts (Chinese UI currently used)
    if (text === "查看更多" || text.toLowerCase().includes("show more")) {
      await clickElement(button as HTMLElement);
      break;
    }
  }
};
