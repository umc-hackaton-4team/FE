import { memo } from "react";
import type { CandyColor } from "../../constants/candy";

// 유리병
import GlassJar from "../../assets/icons/glass-jar.png";

// 캔디 색상별 이미지
import CandyYellow from "../../assets/icons/candy-yellow.svg";
import CandyOrange from "../../assets/icons/candy-orange.svg";
import CandyPink from "../../assets/icons/candy-pink.svg";
import CandyGreen from "../../assets/icons/candy-green.svg";
import CandyBlue from "../../assets/icons/candy-blue.svg";

// 기본 5색만 이미지 매핑 (SPECIAL은 별도 처리)
const CANDY_IMAGES: Partial<Record<CandyColor, string>> = {
  YELLOW: CandyYellow,
  ORANGE: CandyOrange,
  PINK: CandyPink,
  GREEN: CandyGreen,
  BLUE: CandyBlue,
};

// 캔디 개수에 따른 위치 설정 (% 기준)
const CANDY_POSITIONS: Record<number, { top: string; left: string }[]> = {
  1: [{ top: "55%", left: "50%" }],
  2: [
    { top: "60%", left: "35%" },
    { top: "40%", left: "60%" },
  ],
  3: [
    { top: "30%", left: "50%" },
    { top: "55%", left: "30%" },
    { top: "55%", left: "65%" },
  ],
};

interface CandyJarProps {
  candyColors: CandyColor[];
  size?: number;
}

function CandyJar({ candyColors, size = 60 }: CandyJarProps) {
  // 최대 3개의 캔디만 표시
  const displayColors = candyColors.slice(0, 3);
  const candyCount = displayColors.length;

  if (candyCount === 0) {
    return null;
  }

  const positions = CANDY_POSITIONS[candyCount] || CANDY_POSITIONS[3];
  const candySize = size * 0.35; // 캔디 크기는 병의 35%

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* 유리병 배경 */}
      <img
        src={GlassJar}
        alt="candy jar"
        className="absolute inset-0 h-full w-full"
      />

      {/* 캔디들 */}
      {displayColors.map((color, index) => {
        const position = positions[index];
        const imageSrc = CANDY_IMAGES[color];
        // SPECIAL 등 이미지가 없는 색상은 스킵
        if (!imageSrc) return null;
        return (
          <img
            key={`${color}-${index}`}
            src={imageSrc}
            alt={color}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: candySize,
              height: candySize,
              top: position.top,
              left: position.left,
            }}
          />
        );
      })}
    </div>
  );
}

export default memo(CandyJar);
