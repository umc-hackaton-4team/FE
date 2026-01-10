// src/pages/recommend/components/ConfirmedView.tsx
import RecommendationBox from "./RecommendationBox";
import ReviewButton from "./ReviewButton";
import type { Recommendation } from "../../hooks/useRecommendations";

interface Props {
  item: Recommendation;
  userName: string; // ✨ 부모로부터 받을 이름
  onCancel: () => void;
  onComplete: () => void;
}

export const ConfirmedView = ({
  item,
  userName,
  onCancel,
  onComplete,
}: Props) => {
  return (
    <div className="items-center flex flex-col w-full">
      <div className="p-5 text-center">
        <p className="text-[1.2rem] font-bold bg-white px-4 py-2 rounded-full shadow-sm">
          {/* ✨ 받아온 이름 적용 */}
          {`${userName}님, 오늘도 행복하세요! 🍀`}
        </p>
      </div>
      <RecommendationBox imageUrl={item.imageUrl} content={item.content} />
      <div className="flex gap-4 mt-10 w-[26rem]">
        <ReviewButton variant="negative" onClick={onCancel}>
          이거 안할래요
        </ReviewButton>
        <ReviewButton variant="positive" onClick={onComplete}>
          완료 했어요!
        </ReviewButton>
      </div>
    </div>
  );
};
