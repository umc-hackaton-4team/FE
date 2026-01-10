import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { GoogleLoginButton } from "./GoogleLoginButton";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  // 이미 로그인된 사용자는 홈으로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-main px-4">
      <div className="mt-[196px] flex flex-col items-center">
        {/* 로고 영역 */}
        <div className="size-[150px] bg-gray-4" />

        {/* 카피 텍스트 */}
        <p className="text-h2 mt-6 text-gray-8">
          뭔가 카피 넣으면 좋겠는데
        </p>
      </div>

      {/* 로그인 버튼 영역 */}
      <div className="mt-[94px]">
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="text-h4 flex h-[60px] w-[398px] items-center justify-center rounded-xl bg-white text-gray-8 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.15)]"
          >
            로그아웃
          </button>
        ) : (
          <GoogleLoginButton />
        )}
      </div>
    </div>
  );
}
