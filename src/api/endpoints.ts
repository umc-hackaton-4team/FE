// API 엔드포인트 상수
// baseURL: https://goodgame.snowfrost.kr/api

export const API_ENDPOINTS = {
  // 인증
  AUTH: {
    REFRESH: "/auth/refresh",
  },

  // 사용자
  USERS: {
    ME: "/users/me",
  },

  // 기록 (memories)
  MEMORIES: {
    BASE: "/memories",
    DETAIL: (id: number | string) => `/memories/${id}`,
  },

  // 추천 (recommendations)
  RECOMMENDATIONS: {
    BASE: "/recommendations",
    COMPLETE: (id: number | string) => `/recommendations/${id}/complete`,
  },

  // 컨디션
  CONDITIONS: {
    BASE: "/conditions",
  },

  // 데모 데이터 (개발/테스트용)
  MOCK: {
    RECOMMENDATIONS: "/mock/recommendations",
    MEMORIES: "/mock/memories",
    CONDITIONS: "/mock/conditions",
  },
} as const;
