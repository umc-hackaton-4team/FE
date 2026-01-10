import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { CANDY_MAP } from "../../constants/candyImages";

type Memory = {
  memoryId: number;
  content: string;
  candyColor: string;
  createdAt: string;
};

export default function SuccessPage() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("User");
  const [latestCandyColor, setLatestCandyColor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, memoryRes] = await Promise.all([
          api.get("/users/me"),
          api.get("/api/memories"),
        ]);

        if (userRes.data?.success) {
          setUserName(userRes.data.data.name);
        }

        if (
          memoryRes.data?.success &&
          Array.isArray(memoryRes.data.data) &&
          memoryRes.data.data.length > 0
        ) {
          const latestMemory: Memory =
            memoryRes.data.data[memoryRes.data.data.length - 1];

          setLatestCandyColor(latestMemory.candyColor);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF6]">
        로딩 중...
      </div>
    );
  }

  const candyKey = latestCandyColor?.toUpperCase();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FFFDF6] px-8 pb-[72px]">
      <div className="mb-10 flex h-[200px] w-[200px] items-center justify-center">
        {candyKey && CANDY_MAP[candyKey] ? (
          <img
            src={CANDY_MAP[candyKey]}
            alt={candyKey}
            className="h-full w-full object-contain drop-shadow-lg"
          />
        ) : (
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gray-100 text-3xl text-gray-400">
            🍬
          </div>
        )}
      </div>

      <h1 className="mb-16 text-center text-[24px] font-bold leading-relaxed text-[#111111]">
        {userName}님의 기록으로<br />
        오늘도 사탕 만들기 완료!
      </h1>

      <div className="w-full max-w-[320px] flex flex-col items-center space-y-4">
        <button
          onClick={() => navigate("/")}
          className="w-[191px] rounded-[20px] border border-gray-100 bg-white py-4 text-[18px] font-semibold text-gray-700 shadow-sm"
        >
          더 만들기
        </button>

        <button
          onClick={() => navigate("/archive")}
          className="w-[191px] rounded-[20px] bg-[#FF8A8A] py-4 text-[18px] font-bold text-white shadow-sm"
        >
          보관함으로 이동
        </button>
      </div>
    </main>
  );
}
