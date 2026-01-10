import type { CandyColor } from "../constants/candy";

// CandyColor는 constants/candy.ts에서 관리
export type { CandyColor };

export interface Memory {
  memoryId: number;
  content: string;
  candyColor: CandyColor;
  createdAt: string;
  imageUrls?: string[];
}

export interface MemoryResponse {
  data: Memory;
}

export interface MemoriesResponse {
  data: Memory[];
}

// 날짜별 메모리 그룹
export interface MemoriesByDate {
  [date: string]: Memory[];
}
