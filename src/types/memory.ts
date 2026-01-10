export type CandyColor = "YELLOW" | "ORANGE" | "PINK" | "GREEN" | "MINT";

export interface Memory {
  id: number;
  content: string;
  candyColor: CandyColor;
  createdAt: string;
  images?: string[];
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
