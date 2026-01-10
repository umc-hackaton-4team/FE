import type { CandyColor } from "../constants/candy";

// CandyColor는 constants/candy.ts에서 관리
export type { CandyColor };

// 메모리 상세 (백엔드 MemoryDetailResponseDto와 일치)
export interface Memory {
  memoryId: number;
  content: string;
  candyColor: CandyColor;
  createdAt: string;
  imageUrls: string[];
}

// 메모리 생성 요청
export interface MemoryCreateRequest {
  content: string;
  candyColor: CandyColor;
}

// 날짜별 메모리 그룹 (캘린더용)
export interface MemoriesByDate {
  [date: string]: Memory[];
}
