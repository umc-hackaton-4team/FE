import { memo, useMemo } from "react";
import type { Memory } from "../../types/memory";
import CandyJar from "../../components/common/CandyJar";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

interface CalendarProps {
  currentDate: Date;
  selectedDate: Date | null;
  memoriesByDate: Record<string, Memory[]>;
  onDateSelect: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function Calendar({
  currentDate,
  selectedDate,
  memoriesByDate,
  onDateSelect,
  onPrevMonth,
  onNextMonth,
}: CalendarProps) {
  // 현재 달의 첫째 날과 마지막 날
  const { calendarDays } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    // 이전 달 마지막 날
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // 이전 달 날짜
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      });
    }

    // 현재 달 날짜
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // 다음 달 날짜 (6주 맞추기)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return { calendarDays: days };
  }, [currentDate]);

  const formatDateKey = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const isSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return formatDateKey(date) === formatDateKey(selectedDate);
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return formatDateKey(date) === formatDateKey(today);
  };

  return (
    <div className="rounded-[20px] bg-white p-4 shadow-[inset_0px_2px_6px_0px_rgba(0,0,0,0.1)]">
      {/* 헤더: 년월 + 화살표 */}
      <div className="mb-4 flex items-center justify-center gap-6">
        <button onClick={onPrevMonth} className="p-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#222222"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2 className="text-h2">
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </h2>
        <button onClick={onNextMonth} className="p-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="#222222"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="mb-2 grid grid-cols-7">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-2 text-center text-body2 text-gray-8">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-y-1">
        {calendarDays.map(({ date, isCurrentMonth }, index) => {
          const dateKey = formatDateKey(date);
          const dayMemories = memoriesByDate[dateKey] || [];
          const candyColors = dayMemories.map((m) => m.candyColor);
          const hasMemories = candyColors.length > 0;
          const selected = isSelected(date);
          const today = isToday(date);

          return (
            <button
              key={index}
              onClick={() => onDateSelect(date)}
              className="relative flex h-[60px] flex-col items-center justify-center"
            >
              {/* 사탕 병 (메모리가 있는 경우) */}
              {hasMemories && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CandyJar candyColors={candyColors} size={56} />
                </div>
              )}

              {/* 선택된 날짜 표시 (메모리 없을 때만 핑크색 원) */}
              {selected && !hasMemories && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-[#FFBACB] opacity-50" />
                </div>
              )}

              {/* 날짜 텍스트 */}
              <span
                className={`relative z-10 text-body1 ${
                  !isCurrentMonth
                    ? "text-gray-5"
                    : hasMemories
                      ? "font-bold text-gray-8"
                      : selected
                        ? "font-bold text-gray-8"
                        : today
                          ? "font-bold text-primary"
                          : "text-gray-8"
                }`}
              >
                {date.getDate()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default memo(Calendar);
