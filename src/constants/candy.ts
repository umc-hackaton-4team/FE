// 백엔드 CandyColor enum과 일치
// 기본 5색: 기록 작성 시 사용 (HomePage)
// SPECIAL: pick 페이지에서 사용

export const CANDY_COLORS = ["YELLOW", "ORANGE", "PINK", "GREEN", "BLUE"] as const;
export const SPECIAL_CANDY_COLOR = "SPECIAL" as const;
export const ALL_CANDY_COLORS = [...CANDY_COLORS, SPECIAL_CANDY_COLOR] as const;

export type CandyColor = (typeof ALL_CANDY_COLORS)[number];
export type BasicCandyColor = (typeof CANDY_COLORS)[number];

// 색상 이름 -> Tailwind 클래스 매핑 (기록 선택용)
export const CANDY_COLOR_STYLES: Record<BasicCandyColor, { bg: string; name: string }> = {
  YELLOW: { bg: "bg-[#FFD588]", name: "노랑" },
  ORANGE: { bg: "bg-[#FFA15D]", name: "주황" },
  PINK: { bg: "bg-[#FFBACB]", name: "핑크" },
  GREEN: { bg: "bg-[#C9E893]", name: "초록" },
  BLUE: { bg: "bg-[#9FEAE0]", name: "파랑" }, // 기존 MINT 색상값 유지
};

// 색상 HEX 값 (직접 사용 시)
export const CANDY_HEX_COLORS: Record<CandyColor, string> = {
  YELLOW: "#FFD588",
  ORANGE: "#FFA15D",
  PINK: "#FFBACB",
  GREEN: "#C9E893",
  BLUE: "#9FEAE0",
  SPECIAL: "#B8A9C9", // 보라색 계열 (pick 페이지용)
};
