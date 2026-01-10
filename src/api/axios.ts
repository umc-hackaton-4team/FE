// src/api/axios.ts
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL = "https://goodgame.snowfrost.kr/api";

// 1. Axios 인스턴스 생성
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. 요청 인터셉터 (Request Interceptor)
// 요청 보낼 때마다 토큰을 헤더에 자동으로 박아줍니다.
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 3. 응답 인터셉터 (Response Interceptor)
// 에러가 났을 때(특히 401) 가로채서 처리합니다.
api.interceptors.response.use(
  (response) => response, // 성공하면 그냥 통과
  async (error) => {
    const originalRequest = error.config;

    // 에러가 401(인증 실패)이고, 아직 재시도 안 한 요청이라면?
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지용 플래그

      try {
        // A. 리프레시 토큰 꺼내오기
        const { refreshToken, setAccessToken, logout } =
          useAuthStore.getState();

        // 리프레시 토큰도 없으면 답 없음 -> 로그아웃
        if (!refreshToken) {
          logout();
          return Promise.reject(error);
        }

        // B. 백엔드에 토큰 갱신 요청
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken: refreshToken,
        });

        // C. 새로 받은 액세스 토큰으로 갈아끼우기
        // 백엔드 응답: { success, data: { accessToken, accessTokenExpiresIn } }
        const newAccessToken = data.data.accessToken;
        setAccessToken(newAccessToken);

        // D. 실패했던 원래 요청의 헤더를 새 토큰으로 교체
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // E. 원래 요청 재실행 (이 결과가 프론트엔드로 전달됨)
        return api(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰마저 만료되었거나 서버 에러인 경우
        console.error("토큰 갱신 실패, 로그아웃 처리합니다.");
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
