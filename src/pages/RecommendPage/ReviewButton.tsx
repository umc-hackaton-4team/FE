import React from "react";

interface ReviewButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "negative" | "positive"; // negative: 흰색(별로예요), positive: 분홍색(좋아요!)
}

const ReviewButton = ({
  children,
  variant,
  className = "",
  ...props
}: ReviewButtonProps) => {
  // 1. 공통 스타일 (둥글기, 폰트, 크기, 클릭 효과)
  const baseStyle =
    "w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-md flex justify-center items-center";

  // 2. 스타일 분기 처리
  const variants = {
    // 흰색 배경 + 회색 글씨 (왼쪽 버튼)
    negative: "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100",

    // 분홍색 배경 + 흰색 글씨 (오른쪽 버튼 - 이미지 색상 추출: #F08080)
    positive: "bg-[#F08080] text-white hover:bg-[#E07070]",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ReviewButton;
