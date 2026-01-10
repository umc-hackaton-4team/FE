// src/pages/RecommendPage.tsx
import { useRecommendations } from "../../hooks/useRecommendations";
import { useUser } from "../../hooks/useUser"; // ✨ 1. 훅 import
import { BrowsingView } from "./BrowsingView";
import { ConfirmedView } from "./ConfirmedView";
import { FinishedView } from "./FinishedView";

export default function RecommendPage() {
  // 추천 관련 로직
  const {
    loading: recLoading, // 변수명 겹치니까 이름 변경
    isFinished,
    currentItem,
    confirmedItem,
    handlePass,
    handleLike,
    handleCancelConfirm,
    handleComplete,
  } = useRecommendations();

  // ✨ 2. 유저 정보 불러오기
  const { user } = useUser();

  if (recLoading) return <div className="p-10 text-center">불러오는 중...</div>;

  // Case 1: 확정된 상태 (오른쪽 화면)
  if (confirmedItem) {
    return (
      <ConfirmedView
        item={confirmedItem}
        userName={user?.name || "회원"} // ✨ 3. 이름을 넘겨줌 (로딩 덜 됐으면 '회원' 표시)
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
