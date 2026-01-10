// src/pages/recommend/components/BrowsingView.tsx
import RecommendationBox from "./RecommendationBox";
import ReviewButton from "./ReviewButton";
import type { Recommendation } from "../../hooks/useRecommendations";

interface Props {
  item: Recommendation;
  onPass: () => void;
  onLike: () => void;
}

export const BrowsingView = ({ item, onPass, onLike }: Props) => {
  return (
    <div className="items-center flex flex-col w-full">
      <p className="text-[1.5rem] font-bold p-5">어떤 행복을 만들어 볼까요?</p>
      <RecommendationBox imageUrl={item.imageUrl} content={item.content} />
      <div className="flex gap-4 mt-10 w-[26rem]">
        <ReviewButton variant="negative" onClick={onPass}>
          별로예요
        </ReviewButton>
        <ReviewButton variant="positive" onClick={onLike}>
          좋아요!
        </ReviewButton>
      </div>
    </div>
  );
};
