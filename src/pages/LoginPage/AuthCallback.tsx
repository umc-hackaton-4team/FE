import { useAuthRedirect } from "../../hooks/useAuthRedirect";

const AuthCallback = () => {
  // ✅ 훅 실행! (여기서 토큰 저장하고 알아서 홈으로 튕겨줌)
  useAuthRedirect();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <h2 className="mt-4 text-xl font-semibold text-gray-700">
        로그인 처리 중...
      </h2>
      <p className="text-gray-500">잠시만 기다려주세요.</p>
    </div>
  );
};

export default AuthCallback;
