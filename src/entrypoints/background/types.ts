interface BaseRentalInfo {
  monthly_rent?: number;
  floor_number?: number;
  electricity_fee_type?: string;
  electricity_rate?: number;
  management_fee?: number;
  total_floors?: number;
  is_top_floor_addition?: boolean;
}

interface AnalyzedRentalFields {
  room_type: string;
  city: string;
  district: string;
  nearby_mrt_stations: string[];
}

interface NotionRentalFields {
  room_type: { name: string };
  city: { name: string };
  district: { name: string };
  nearby_mrt_stations: { name: string }[];
}

export type AnalyzedRentalInfo = BaseRentalInfo & AnalyzedRentalFields;

export type NotionRentalInfo = BaseRentalInfo & NotionRentalFields;
