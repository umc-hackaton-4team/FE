import type { CandyColor } from "../../types/memory";

// 유리병
import GlassJar from "../../assets/icons/glass-jar.png";

// 캔디 색상별 이미지
import CandyYellow from "../../assets/icons/candy-yellow.svg";
import CandyOrange from "../../assets/icons/candy-orange.svg";
import CandyPink from "../../assets/icons/candy-pink.svg";
import CandyGreen from "../../assets/icons/candy-green.svg";
import CandyMint from "../../assets/icons/candy-mint.svg";

const CANDY_IMAGES: Record<CandyColor, string> = {
  YELLOW: CandyYellow,
  ORANGE: CandyOrange,
  PINK: CandyPink,
  GREEN: CandyGreen,
  MINT: CandyMint,
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

export default function CandyJar({ candyColors, size = 60 }: CandyJarProps) {
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
        return (
          <img
            key={`${color}-${index}`}
            src={CANDY_IMAGES[color]}
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
