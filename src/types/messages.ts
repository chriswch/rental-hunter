import { Post } from "./posts";

// Message types
export enum MessageType {
  // Popup to Content
  SCRAPE_START = "SCRAPE_START",

  // Content to Background
  SAVE_POST = "SAVE_POST",

  // Content to Popup
}

// Base message interface
export interface BaseMessage {
  type: MessageType;
  payload?: unknown;
}

// Specific message interfaces
export interface StartScrapeMessage extends BaseMessage {
  type: MessageType.SCRAPE_START;
  payload: {
    numPosts: number;
  };
}

export interface SavePostMessage extends BaseMessage {
  type: MessageType.SAVE_POST;
  payload: {
    post: Post;
  };
}

// Union type for all possible messages
export type Message = StartScrapeMessage | SavePostMessage;
