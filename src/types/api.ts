// 백엔드 API 공통 응답 형식
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 에러 응답
export interface ApiError {
  success: false;
  message: string;
  code?: string;
}

// 페이지네이션 응답 (필요 시 사용)
export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}
