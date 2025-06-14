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

export type AnalyzedRentalInfo = BaseRentalInfo & AnalyzedRentalFields;

