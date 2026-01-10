import { useEffect, useState } from "react";
import { api } from "../api/ axios"; // 경로 확인 필요
import { getTodayDate } from "../utils/dateUtils"; // 경로 확인 필요

export interface Recommendation {
  id: number;
  content: string;
  imageUrl?: string; // 이미지 있는 경우를 대비
  // 태그 정보 등이 있다면 여기에 추가 (예: tags: string[])
}

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✨ 여기가 핵심: '좋아요'를 눌러 확정된 아이템을 저장
  const [confirmedItem, setConfirmedItem] = useState<Recommendation | null>(
    null
  );

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

  // [왼쪽 화면] 별로예요 -> 다음 카드로
  const handlePass = () => {
    if (currentIndex < recommendations.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // [왼쪽 화면] 좋아요! -> 확정 상태으로 전환
  const handleLike = () => {
    const current = recommendations[currentIndex];
    if (current) {
      setConfirmedItem(current); // 현재 카드를 확정 상태로 변경
    }
  };

  // [오른쪽 화면] 이거 안할래요 (아직 구현 X)
  const handleCancelConfirm = () => {
    console.log("취소 기능은 아직 미구현");
    // 추후 로직: setConfirmedItem(null) 등으로 다시 돌아가게 구현 가능
  };

  // [오른쪽 화면] 완료 했어요! (아직 구현 X)
  const handleComplete = () => {
    console.log("완료 화면으로 이동 예정");
  };

  const isFinished = currentIndex >= recommendations.length;
  const currentItem = recommendations[currentIndex];

  return {
    loading,
    isFinished,
    currentItem,
    confirmedItem, // View에서 화면 분기용으로 사용
    handlePass,
    handleLike,
    handleCancelConfirm,
    handleComplete,
  };
};
