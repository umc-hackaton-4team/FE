import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { useAuthStore } from "../../store/authStore";
import { GoogleLoginButton } from "./GoogleLoginButton";

export default function LoginPage() {
  useAuthRedirect();
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#fffcf7] px-4">
      <div className="mt-[196px] flex flex-col items-center">
        {/* 로고 영역 */}
        <div className="size-[150px] bg-[#d9d9d9]" />

        {/* 카피 텍스트 */}
        <p className="mt-[24px] text-[20px] font-bold leading-[1.3] text-black">
          뭔가 카피 넣으면 좋겠는데
        </p>
      </div>

      {/* 로그인 버튼 영역 */}
      <div className="mt-[94px]">
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="flex h-[60px] w-[398px] items-center justify-center rounded-[12px] bg-white text-[16px] font-bold leading-[1.3] text-black shadow-[0px_0px_8px_0px_rgba(0,0,0,0.15)]"
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
