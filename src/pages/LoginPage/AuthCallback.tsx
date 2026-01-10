import { Spinner } from "../../components/common/Spinner";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";

const AuthCallback = () => {
  useAuthRedirect();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-main">
      <Spinner size="lg" />
      <h2 className="text-h3 mt-4 text-gray-7">로그인 처리 중...</h2>
      <p className="text-caption1 text-gray-5">잠시만 기다려주세요.</p>
    </div>
  );
};

export default AuthCallback;
