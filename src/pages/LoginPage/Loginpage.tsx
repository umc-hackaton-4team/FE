import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { useAuthStore } from "../../store/authStore";
import { GoogleLoginButton } from "./GoogleLoginButton";

export default function LoginPage() {
  useAuthRedirect();
  const { isAuthenticated, logout } = useAuthStore();
  return (
    <div>
      <h1>내 게임 앱</h1>

      {isAuthenticated ? (
        <div>
          <p>로그인 되었습니다!</p>
          <button onClick={logout}>로그아웃</button>
        </div>
      ) : (
        <GoogleLoginButton />
      )}
    </div>
  );
}
