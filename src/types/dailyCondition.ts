export type EnergyLevel = "LOW" | "NORMAL" | "HIGH";
export type AvailableTime = "SHORT" | "MODERATE" | "LONG";
export type SpendingLevel = "NONE" | "LIGHT" | "HEAVY";
export type ActivityLocation = "HOME" | "OUTSIDE";

export interface DailyConditionRequest {
  energyLevel: EnergyLevel;
  availableTime: AvailableTime;
  spendingLevel: SpendingLevel;
  activityLocation: ActivityLocation;
  description: string;
}
