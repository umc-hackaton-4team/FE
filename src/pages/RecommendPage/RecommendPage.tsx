import { useEffect, useState } from "react";
import { api } from "../../api/ axios";
import RecommendationBox from "./RecommendationBox";
import ReviewButton from "./ReviewButton";
import { getTodayDate } from "../../utils/dateUtils";

interface Recommendation {
  id: number;
  content: string;
}

export default function RecommendPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 몇 번째 카드인지 (0, 1, 2...)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendData = async () => {
      try {
        const today = getTodayDate();
        const res = await api.get(`/recommendations?date=${today}`);
        setRecommendations(res.data.data.recommendations);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendData();
  }, []);

  const handlePass = () => {
    if (currentIndex < recommendations.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // 로딩 중일 때
  if (loading) return <div className="p-10 text-center">불러오는 중...</div>;

  // 6. 모든 카드를 다 봤을 때 (배열 끝까지 갔을 때) 처리
  if (currentIndex >= recommendations.length) {
    return (
      <div className="items-center flex flex-col p-10">
        <p className="text-[1.5rem] font-bold">오늘의 추천 끝!</p>
        <p>더 이상 추천할 항목이 없습니다.</p>
      </div>
    );
  }

  // 7. 현재 보여줄 데이터 가져오기
  const currentItem = recommendations[currentIndex];

  return (
    <div className=" items-center flex flex-col">
      <p className="text-[1.5rem] font-bold p-5">어떤 행복을 만들어 볼까요</p>
      <RecommendationBox content={currentItem.content} />
      <div className="flex gap-4 mt-10 w-[26rem]">
        <ReviewButton variant="negative" onClick={handlePass}>
          별로예요
        </ReviewButton>
        <ReviewButton
          variant="positive"
          onClick={() => console.log("좋아요 클릭")}
        >
          좋아요!
        </ReviewButton>
      </div>
    </div>
  );
}
