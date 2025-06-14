import { SavePostMessage } from "@/types/messages";
import { scrapedPostCount as scrapePostCountStorage } from "@/utils/storage";

import { AnalyzedRentalInfo, NotionRentalInfo } from "../../types";
import { analyzeRentalInfo } from "../ai-analyzer";
import { createPost, updatePost } from "../notion";

const convertToNotionFormat = (
  rentalInfo: AnalyzedRentalInfo,
): NotionRentalInfo => {
  const { room_type, city, district, nearby_mrt_stations } = rentalInfo;
  const notionRentalInfo: NotionRentalInfo = {
    room_type: { name: room_type },
    city: { name: city },
    district: { name: district },
    nearby_mrt_stations: nearby_mrt_stations.map((station) => ({
      name: station,
    })),
  };

  console.log("Notion rental info:", notionRentalInfo);

  return notionRentalInfo;
};

const updateScrapedPostCount = async () => {
  const currentCount = await scrapePostCountStorage.getValue();
  await scrapePostCountStorage.setValue(currentCount + 1);
};

const handleSavePost = async (payload: SavePostMessage["payload"]) => {
  const notionPageId = await createPost(payload.post);
  if (notionPageId) {
    const analyzedRentalInfo = await analyzeRentalInfo(payload.post);
    if (analyzedRentalInfo) {
      await updatePost(notionPageId, convertToNotionFormat(analyzedRentalInfo));
    }
    await updateScrapedPostCount();
  }
};

export default handleSavePost;
