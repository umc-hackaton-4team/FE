import { memo } from "react";
import specialcandy from "../../assets/icons/specialcandy.svg";

// 디자인에 필요한 데이터들을 정의합니다.
interface BoxProps {
  id?: number;
  imageUrl?: string; // 이미지 URL (없으면 회색 원 표시)
  content: string; // 예: "집 근처에서 산책하기"
}

const RecommendationBox = ({
  imageUrl = specialcandy,
  content = "집 근처에서 산책하기",
}: BoxProps) => {
  return (
    // 1. 외곽 박스 컨테이너
    <div className="flex flex-col items-center p-8 bg-white border-none w-[24.875rem] h-[33.875rem] rounded-[2rem] text-center shadow-[0_0_25px_5px_rgba(0,0,0,0.08)] max-w-md mx-auto">
      {/* 2. 이미지 영역 (이미지가 없으면 회색 원 placeholder 표시) */}
      <div className="mb-[2.5rem]">
        {imageUrl ? (
          <img
            src={imageUrl}
            className="w-[12.5rem] h-[12.5rem]  rounded-full object-cover bg-gray-200 mt-[3rem]"
          />
        ) : (
          <div className="w-[12.5rem] h-[12.5rem] rounded-full bg-gray-200 animate-pulse mt-[3rem]"></div>
        )}
      </div>

      {/* 3. 텍스트 영역 */}
      <h2 className="text-4xl font-extrabold text-black leading-tight mb-8">
        {content}
      </h2>
    </div>
  );
};

export default memo(RecommendationBox);
