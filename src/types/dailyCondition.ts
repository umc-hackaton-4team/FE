// 백엔드 enum과 일치
export type EnergyLevel = "DEPLETED" | "NORMAL" | "FULL";
export type AvailableTime = "SHORT" | "MODERATE" | "HALF_DAY";
export type SpendingLevel = "FREE" | "LIGHT" | "HEAVY";
export type ActivityLocation = "HOME" | "OUTSIDE";

// 상태 생성 요청
export interface DailyConditionRequest {
  energyLevel: EnergyLevel;
  availableTime: AvailableTime;
  spendingLevel: SpendingLevel;
  activityLocation: ActivityLocation;
  description: string;
}

// 상태 조회 응답
export interface DailyConditionResponse {
  energyLevel: EnergyLevel;
  availableTime: AvailableTime;
  spendingLevel: SpendingLevel;
  activityLocation: ActivityLocation;
  description: string;
  recordDate: string;
  createdAt: string;
}
