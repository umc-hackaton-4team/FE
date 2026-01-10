import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { useAuthStore } from "../store/authStore";

interface UserResponse {
  result: {
    id: number;
    email: string;
    name: string;
    profileImage: string;
  };
}

export const useAuthRedirect = () => {
  const { login, setUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("accessToken");
      const refreshToken = params.get("refreshToken");

      if (accessToken && refreshToken) {
        // 1. 토큰 저장
        login(accessToken, refreshToken);

        try {
          // 2. 사용자 정보 조회
          const { data } = await api.get<UserResponse>("/users/me");
          setUser(data.result);
        } catch (error) {
          console.error("사용자 정보 조회 실패:", error);
        }

        // 3. 홈으로 이동
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    };

    handleAuth();
  }, [login, setUser, navigate]);
};
