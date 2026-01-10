import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/axios";
import { API_ENDPOINTS } from "../../api/endpoints";
import type { Memory } from "../../types/memory";
import type { CandyColor } from "../../constants/candy";
import type { ApiResponse } from "../../types/api";

// 사탕 색상별 SVG 아이콘
import CandyYellow from "../../assets/icons/candy-yellow.svg";
import CandyOrange from "../../assets/icons/candy-orange.svg";
import CandyPink from "../../assets/icons/candy-pink.svg";
import CandyGreen from "../../assets/icons/candy-green.svg";
import CandyBlue from "../../assets/icons/candy-blue.svg";

const CANDY_IMAGE_BY_COLOR: Partial<Record<CandyColor, string>> = {
  YELLOW: CandyYellow,
  ORANGE: CandyOrange,
  PINK: CandyPink,
  GREEN: CandyGreen,
  BLUE: CandyBlue,
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function MemoryDetailPage() {
  const navigate = useNavigate();
  const { memoryId } = useParams<{ memoryId: string }>();
  const [memory, setMemory] = useState<Memory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemory = async () => {
      if (!memoryId) return;
      try {
        const response = await api.get<ApiResponse<Memory>>(API_ENDPOINTS.MEMORIES.DETAIL(memoryId));
        setMemory(response.data.data);
      } catch (error) {
        console.error("Failed to fetch memory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemory();
  }, [memoryId]);

  const formatDate = (dateStr: string): { short: string; weekday: string } => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = WEEKDAYS[date.getDay()];
    return {
      short: `${month}. ${day}.`,
      weekday: `${weekday}요일`,
    };
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-main">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!memory) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-main px-4">
        <p className="text-body2 text-gray-5">메모리를 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate("/archive")}
          className="mt-4 rounded-xl bg-primary px-6 py-3 text-h3 text-white"
        >
          뒤로 가기
        </button>
      </div>
    );
  }

  const { short, weekday } = formatDate(memory.createdAt);
  const candyImage = CANDY_IMAGE_BY_COLOR[memory.candyColor];

  return (
    <div className="flex h-full flex-col bg-main px-4 pb-[88px] pt-4">
      {/* 메인 카드 */}
      <div className="relative flex-1 rounded-[20px] bg-[#FFF8F6] p-4 shadow-sm">
        {/* 날짜 탭 */}
        <div className="absolute -top-0 left-4 rounded-t-xl bg-white px-4 py-2">
          <span className="text-body2-sb">{short}</span>
          <span className="ml-2 text-body2-sb">{weekday}</span>
        </div>

        {/* 사탕 이미지 + 메시지 */}
        <div className="mt-8 flex items-center gap-4">
          <img
            src={candyImage}
            alt={memory.candyColor}
            className="h-[100px] w-[100px] object-contain"
          />
          <div>
            <p className="text-h3">이때의 행복은</p>
            <p className="text-h3">이런 사탕이 됐었네요!</p>
          </div>
        </div>

        {/* 일기 내용 */}
        <div className="mt-6 min-h-[200px] rounded-2xl border border-gray-5 bg-white p-4">
          <p className="whitespace-pre-wrap text-body2 text-gray-8">
            {memory.content}
          </p>
        </div>

        {/* 이미지들 */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((index) => {
            const imageUrl = memory.imageUrls?.[index];
            return (
              <div
                key={index}
                className="flex h-20 items-center justify-center overflow-hidden rounded-lg border border-gray-4 bg-gray-2"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={`memory-${index}`}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 뒤로 가기 버튼 */}
      <button
        onClick={() => navigate("/archive")}
        className="mt-4 w-full rounded-xl bg-primary py-4 text-h3 text-white"
      >
        뒤로 가기
      </button>
    </div>
  );
}
