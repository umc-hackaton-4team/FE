import googleIcon from "../../assets/icons/google.svg";

export const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.location.href =
      "https://goodgame.snowfrost.kr/api/auth/google/login";
  };

  return (
    <button
      onClick={handleLogin}
      className="flex h-[60px] w-[398px] items-center justify-center gap-3 rounded-xl bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.15)]"
    >
      <img src={googleIcon} alt="Google" className="size-6" />
      <span className="text-h4 text-gray-8">Google 로그인</span>
    </button>
  );
};
