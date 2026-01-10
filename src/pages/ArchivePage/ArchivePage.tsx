import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import Calendar from "./Calendar";
import type { Memory } from "../../types/memory";
import type { CandyColor } from "../../constants/candy";

// 사탕 색상별 SVG 아이콘
import CandyYellow from "../../assets/icons/candy-yellow.svg";
import CandyOrange from "../../assets/icons/candy-orange.svg";
import CandyPink from "../../assets/icons/candy-pink.svg";
import CandyGreen from "../../assets/icons/candy-green.svg";
import CandyBlue from "../../assets/icons/candy-blue.svg";

const CANDY_ICON_BY_COLOR: Partial<Record<CandyColor, string>> = {
  YELLOW: CandyYellow,
  ORANGE: CandyOrange,
  PINK: CandyPink,
  GREEN: CandyGreen,
  BLUE: CandyBlue,
};

export default function ArchivePage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(false);

  // 메모리를 날짜별로 그룹핑
  const memoriesByDate = useMemo(() => {
    const grouped: Record<string, Memory[]> = {};
    memories.forEach((memory) => {
      const dateKey = memory.createdAt.split("T")[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(memory);
    });
    return grouped;
  }, [memories]);

  // 선택된 날짜의 메모리 목록
  const selectedDateMemories = useMemo(() => {
    if (!selectedDate) return [];
    const dateKey = selectedDate.toISOString().split("T")[0];
    return memoriesByDate[dateKey] || [];
  }, [selectedDate, memoriesByDate]);

  // 메모리 목록 가져오기
  useEffect(() => {
    const fetchMemories = async () => {
      setLoading(true);
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const response = await api.get(`/memories?year=${year}&month=${month}`);
        setMemories(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch memories:", error);
        setMemories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDate(null);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMemoryClick = (memoryId: number) => {
    navigate(`/archive/${memoryId}`);
  };

  const formatSelectedDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className="flex h-full flex-col bg-main px-4 pb-[88px] pt-4">
      {/* 캘린더 */}
      <Calendar
        currentDate={currentDate}
        selectedDate={selectedDate}
        memoriesByDate={memoriesByDate}
        onDateSelect={handleDateSelect}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      {/* 선택된 날짜 표시 */}
      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-body2-sb">{formatSelectedDate(selectedDate)}</h3>

          {/* 메모리 목록 */}
          <div className="mt-4 space-y-3">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : selectedDateMemories.length > 0 ? (
              selectedDateMemories.map((memory) => (
                <button
                  key={memory.memoryId}
                  onClick={() => handleMemoryClick(memory.memoryId)}
                  className="flex w-full items-center gap-4 rounded-xl bg-white p-4 shadow-md transition hover:shadow-lg"
                >
                  {/* 사탕 아이콘 */}
                  <img
                    src={CANDY_ICON_BY_COLOR[memory.candyColor]}
                    alt={memory.candyColor}
                    className="h-[60px] w-[60px] object-contain"
                  />
                  {/* 내용 미리보기 */}
                  <p className="flex-1 truncate text-left text-body2 text-gray-8">
                    {memory.content.length > 40
                      ? `${memory.content.slice(0, 40)}...`
                      : memory.content}
                  </p>
                </button>
              ))
            ) : (
              <div className="flex justify-center py-8">
                <p className="text-body2 text-gray-5">
                  이 날 작성된 일기가 없어요.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
