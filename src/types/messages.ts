import { Post } from "./posts";

// Message types
export enum MessageType {
  // Popup to Content
  SCRAPE_START = "SCRAPE_START",

  // Content to Background
  SAVE_POST = "SAVE_POST",

  // Content to Popup
  SCRAPE_PROGRESS = "SCRAPE_PROGRESS",
  SCRAPE_COMPLETED = "SCRAPE_COMPLETED",
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

export interface ScrapeProgressMessage extends BaseMessage {
  type: MessageType.SCRAPE_PROGRESS;
  payload: {
    progress: number; // amount of posts scraped
  };
}

export interface SavePostMessage extends BaseMessage {
  type: MessageType.SAVE_POST;
  payload: {
    post: Post;
  };
}

export interface ScrapeCompletedMessage extends BaseMessage {
  type: MessageType.SCRAPE_COMPLETED;
}

// Union type for all possible messages
export type Message =
  | StartScrapeMessage
  | ScrapeProgressMessage
  | SavePostMessage
  | ScrapeCompletedMessage;
