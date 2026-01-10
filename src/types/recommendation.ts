export type RecommendationStatus = "DEFAULT" | "PENDING" | "READY";

export interface Recommendation {
  id: number;
  userId: number;
  content: string;
  recommendDate: string;
  createdAt: string;
  imageUrl?: string;
}

// 추천 목록 응답
export interface RecommendationsData {
  status: RecommendationStatus;
  recommendations: Recommendation[];
  totalCount: number;
}
