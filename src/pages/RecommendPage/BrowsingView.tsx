// src/pages/recommend/components/BrowsingView.tsx
import RecommendationBox from "./RecommendationBox";
import type { Recommendation } from "../../types/recommendation";

interface Props {
  item: Recommendation;
  onPass: () => void;
  onLike: () => void;
}

export const BrowsingView = ({ item, onPass, onLike }: Props) => {
  // 임시 태그 (실제로는 API에서 받아올 수 있음)
  const tags = ["풀충전", "10분 내외", "가벼운 소비"];

  return (
    <div className="flex flex-col items-center w-full bg-[#FFFCF7] pb-24">
      {/* 제목 */}
      <p className="text-[24px] font-bold text-[#222] py-5">
        어떤 행복을 만들어 볼까요?
      </p>

      {/* 추천 카드 (겹쳐진 효과 포함) */}
      <RecommendationBox
        imageUrl={item.imageUrl}
        content={item.content}
        tags={tags}
        showStackEffect={true}
      />

      {/* 버튼 영역 */}
      <div className="flex gap-3 mt-8 w-full max-w-[398px] px-4">
        <button
          onClick={onPass}
          className="flex-1 py-4 rounded-[12px] bg-white text-[18px] font-bold text-[#464646] leading-[1.3] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)]"
        >
          별로예요
        </button>
        <button
          onClick={onLike}
          className="flex-1 py-4 rounded-[12px] bg-[#FC8080] text-[18px] font-bold text-white leading-[1.3]"
        >
          좋아요!
        </button>
      </div>
    </div>
  );
};
