import { memo } from "react";
import specialcandy from "../../assets/icons/specialcandy.svg";

interface BoxProps {
  id?: number;
  imageUrl?: string;
  content: string;
}

const RecommendationBox = ({ imageUrl, content }: BoxProps) => {
  return (
    <div className="flex flex-col items-center p-8 bg-white border-none w-[24.875rem] h-[33.875rem] rounded-[2rem] text-center shadow-[0_0_25px_5px_rgba(0,0,0,0.08)] max-w-md mx-auto">
      <div className="mb-[2.5rem]">
        <img
          src={imageUrl || specialcandy}
          className="w-[12.5rem] h-[12.5rem] rounded-full object-cover bg-gray-200 mt-[3rem]"
        />
      </div>

      <h2 className="text-4xl font-extrabold text-black leading-tight mb-8">
        {content}
      </h2>
    </div>
  );
};

export default memo(RecommendationBox);
