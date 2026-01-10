// src/pages/recommend/components/ConfirmedView.tsx
import RecommendationBox from "./RecommendationBox";
import type { Recommendation } from "../../types/recommendation";

interface Props {
  item: Recommendation;
  userName: string;
  onCancel: () => void;
  onComplete: () => void;
}

export const ConfirmedView = ({
  item,
  userName,
  onCancel,
  onComplete,
}: Props) => {
  // 임시 태그 (실제로는 API에서 받아올 수 있음)
  const tags = ["풀충전", "10분 내외", "가벼운 소비"];

  return (
    <div className="flex flex-col items-center w-full bg-[#FFFCF7] pb-24">
      {/* 상단 배너 */}
      <div className="py-5">
        <div className="flex items-center gap-1 px-8 py-3 bg-[#FFF8F6] rounded-full shadow-[0px_2px_8px_0px_rgba(0,0,0,0.2)]">
          <p className="text-[20px] font-bold text-[#464646] leading-[1.3]">
            {userName}님, 오늘도 행복하세요!
          </p>
          <span className="text-[20px]">🍀</span>
        </div>
      </div>

      {/* 추천 카드 (겹쳐진 효과 없음) */}
      <RecommendationBox
        imageUrl={item.imageUrl}
        content={item.content}
        tags={tags}
        showStackEffect={false}
      />

      {/* 버튼 영역 */}
      <div className="flex gap-3 mt-8 w-full max-w-[398px] px-4">
        <button
          onClick={onCancel}
          className="flex-1 py-4 rounded-[12px] bg-white text-[18px] font-bold text-[#464646] leading-[1.3] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)]"
        >
          이거 안할래요
        </button>
        <button
          onClick={onComplete}
          className="flex-1 py-4 rounded-[12px] bg-[#FC8080] text-[18px] font-bold text-white leading-[1.3]"
        >
          완료 했어요!
        </button>
      </div>
    </div>
  );
};
