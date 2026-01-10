import { memo } from "react";
import specialcandy from "../../assets/icons/specialcandy.svg";

interface BoxProps {
  id?: number;
  imageUrl?: string;
  content: string;
  tags?: string[];
  showStackEffect?: boolean;
}

const RecommendationBox = ({
  imageUrl,
  content,
  tags = [],
  showStackEffect = false,
}: BoxProps) => {
  return (
    <div className="relative w-full flex justify-center">
      {/* 겹쳐진 카드 효과 */}
      {showStackEffect && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[334px] h-[540px] bg-[#F8F8F8] rounded-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.2)]" />
          <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[366px] h-[541px] bg-[#FDFDFD] rounded-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.2)]" />
        </>
      )}

      {/* 메인 카드 */}
      <div
        className={`relative flex flex-col items-center bg-white rounded-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.2)] w-[398px] ${
          showStackEffect ? "mt-[25px]" : ""
        }`}
        style={{ minHeight: "542px" }}
      >
        {/* 사탕 이미지 */}
        <div className="mt-[80px] mb-8">
          <img
            src={imageUrl || specialcandy}
            alt="사탕"
            className="w-[200px] h-[200px] object-contain"
          />
        </div>

        {/* 추천 내용 */}
        <h2 className="text-[32px] font-bold text-black text-center leading-[1.3] px-6 mb-6">
          {content}
        </h2>

        {/* 태그들 */}
        {tags.length > 0 && (
          <div className="flex gap-2 flex-wrap justify-center px-4 pb-8">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-5 py-[6px] rounded-full border-[1.5px] border-[#FC8080] bg-white text-[14px] font-bold text-[#FC8080] leading-[1.5]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(RecommendationBox);
