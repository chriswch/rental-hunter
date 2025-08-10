# Rental Hunter – Browser Extension

Scrape rental posts from Facebook groups, extract key details with Gemini, and save them into Notion. Built with WXT (MV3), TypeScript, and React.

## Tech stack

- **WXT** (MV3)
- **TypeScript**
- **React** (popup UI)

## Permissions

Configured in `wxt.config.ts`:

- `host_permissions`: `https://api.notion.com/*`, `https://generativelanguage.googleapis.com/*`
- `permissions`: `storage`

## Architecture

- **Popup** sends `SCRAPE_START` to the active tab.
- **Content** script scrapes posts, then sends `SAVE_POST` to background per post.
- **Background** handles `SAVE_POST`:
  1. Creates a Notion page
  2. Analyzes content via Gemini
  3. Updates the Notion page
  4. Increments progress in storage

## Messaging

`src/types/messages.ts`

- `SCRAPE_START` (popup → content): `{ numPosts: number }`
- `SAVE_POST` (content → background): `{ post: Post }`

## Content scraping

- Selectors centralized in `content/providers/facebook/selectors.ts`.
- Side-effects isolated in `content/human-behavior.ts`.
- Parsing composes behavior + selectors; price, content, images extracted safely.

## State and storage

Defined in `src/utils/storage.ts` using WXT storage items:

- Local: `notionApiKey`, `notionDatabaseId`, `geminiApiKey`
- Session: `totalPostsToScrape`, `scrapedPostCount`

Popup observes `scrapedPostCount` to render progress.
