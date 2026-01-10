export const GoogleLoginButton = () => {
  const handleLogin = () => {
    // 백엔드의 구글 로그인 엔드포인트로 이동
    // 이 주소로 이동하면 백엔드가 구글 로그인 창을 띄워줍니다.
    window.location.href =
      "https://goodgame.snowfrost.kr/api/auth/google/login";
  };

  return <button onClick={handleLogin}>Google 계정으로 로그인</button>;
};
