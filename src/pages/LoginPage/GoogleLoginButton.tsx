import googleIcon from "../../assets/icons/google.svg";

export const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.location.href =
      "https://goodgame.snowfrost.kr/api/auth/google/login";
  };

  return (
    <button
      onClick={handleLogin}
      className="flex h-[60px] w-[398px] items-center justify-center gap-3 rounded-[12px] bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.15)]"
    >
      <img src={googleIcon} alt="Google" className="size-6" />
      <span className="text-[16px] font-bold leading-[1.3] text-black">
        Google 로그인
      </span>
    </button>
  );
};
