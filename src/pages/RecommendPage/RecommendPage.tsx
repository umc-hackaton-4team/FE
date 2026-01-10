// src/pages/RecommendPage.tsx
import { useNavigate } from "react-router-dom";
import { useRecommendations } from "../../hooks/useRecommendations";
import { useUser } from "../../hooks/useUser";
import { BrowsingView } from "./BrowsingView";
import { ConfirmedView } from "./ConfirmedView";
import { FinishedView } from "./FinishedView";
import { Spinner } from "../../components/common/Spinner";

export default function RecommendPage() {
  const navigate = useNavigate();

  // 추천 관련 로직
  const {
    loading: recLoading,
    isFinished,
    currentItem,
    confirmedItem,
    handlePass,
    handleLike,
    handleCancelConfirm,
  } = useRecommendations();

  // ✨ 2. 유저 정보 불러오기
  const { user } = useUser();

  if (recLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-main">
        <Spinner size="lg" />
        <p className="mt-4 text-body2 text-gray-6">추천 미션을 불러오는 중...</p>
      </div>
    );
  }

  // 완료 버튼 클릭 시 성취 기록 페이지로 이동
  const handleComplete = () => {
    if (confirmedItem) {
      navigate("/pick/achievement", { state: { item: confirmedItem } });
    }
  };

  // Case 1: 확정된 상태 (오른쪽 화면)
  if (confirmedItem) {
    return (
      <ConfirmedView
        item={confirmedItem}
        userName={user?.name || "회원"}
        onCancel={handleCancelConfirm}
        onComplete={handleComplete}
      />
    );
  }

  // Case 2: 끝남
  if (isFinished) return <FinishedView />;

  // Case 3: 탐색 중
  if (!currentItem) return <FinishedView />;

  return (
    <BrowsingView item={currentItem} onPass={handlePass} onLike={handleLike} />
  );
}
