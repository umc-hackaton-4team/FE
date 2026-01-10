import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 라우터 이동 기능 추가
import { useAuthStore } from "../store/authStore";

export const useAuthRedirect = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate(); // ✅ 이동을 위해 추가

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      // 1. 스토어에 토큰 저장
      login(accessToken, refreshToken);

      // 2. 로그 확인
      console.log("로그인 성공! 홈으로 이동합니다.");

      // 3. 홈('/')으로 이동하면서, 뒤로가기 못하게 기록 교체(replace: true)
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [login, navigate]);
};
