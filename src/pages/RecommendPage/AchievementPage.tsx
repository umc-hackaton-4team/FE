import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { API_ENDPOINTS } from "../../api/endpoints";
import { useToastStore } from "../../store/toastStore";
import { Spinner } from "../../components/common/Spinner";
import specialcandy from "../../assets/icons/specialcandy.svg";
import type { Recommendation } from "../../types/recommendation";

// 이미지 추가 아이콘 컴포넌트
const ImageAddIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.25 18.75V22.5H30V25H26.25V28.75H23.75V25H20V22.5H23.75V18.75H26.25ZM26.2625 2.5C27.0125 2.5 27.625 3.1125 27.625 3.8625V16.25H25.125V5H5.125V25.0125L17.625 12.5L22.625 17.5V20.5375L17.625 15.5375L9.1625 24H17.625V26.5H4.0125C3.34997 26.4993 2.71475 26.2357 2.24621 25.7668C1.77766 25.298 1.51447 24.6626 1.5145 24C1.5145 23.9875 1.5145 23.975 1.5145 23.9625V3.8625C1.51516 3.50117 1.65925 3.15497 1.91495 2.89955C2.17066 2.64413 2.51703 2.50043 2.87837 2.5H26.2625ZM9.5 7.5C10.163 7.5 10.7989 7.76339 11.2678 8.23223C11.7366 8.70107 12 9.33696 12 10C12 10.663 11.7366 11.2989 11.2678 11.7678C10.7989 12.2366 10.163 12.5 9.5 12.5C8.83696 12.5 8.20107 12.2366 7.73223 11.7678C7.26339 11.2989 7 10.663 7 10C7 9.33696 7.26339 8.70107 7.73223 8.23223C8.20107 7.76339 8.83696 7.5 9.5 7.5Z"
      fill="#B1B1B1"
    />
  </svg>
);

export default function AchievementPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const item = location.state?.item as Recommendation | undefined;
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);

  // 현재 날짜 포맷
  const today = new Date();
  const dateStr = `${today.getMonth() + 1}. ${today.getDate()}.`;
  const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const dayStr = dayNames[today.getDay()];

  const handleSubmit = async () => {
    if (!item) {
      addToast("추천 정보가 없습니다.", "error");
      return;
    }

    setLoading(true);
    try {
      // 완료 API 호출
      await api.post(API_ENDPOINTS.RECOMMENDATIONS.COMPLETE(item.id), {
        memo,
      });
      addToast("사탕이 만들어졌어요!", "success");
      navigate("/archive");
    } catch (err) {
      console.error(err);
      addToast("저장에 실패했습니다.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!item) {
    return (
      <div className="flex h-full items-center justify-center bg-[#FFFCF7]">
        <p className="text-[#909090]">잘못된 접근입니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#FFFCF7] px-4 pb-24">
      {/* 메인 카드 영역 */}
      <div className="relative mt-6">
        {/* 티켓 형태 카드 배경 */}
        <div className="relative bg-white rounded-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] overflow-hidden">
          {/* 상단 날짜 탭 */}
          <div className="absolute top-0 left-0 bg-white px-4 py-2 rounded-br-[16px] shadow-sm">
            <span className="text-[16px] font-semibold text-black">
              {dateStr}
            </span>
            <span className="text-[16px] font-semibold text-black ml-2">
              {dayStr}
            </span>
          </div>

          {/* 사탕과 텍스트 영역 */}
          <div className="pt-16 px-4 pb-4">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={item.imageUrl || specialcandy}
                alt="사탕"
                className="w-[76px] h-[76px] object-contain"
              />
              <div className="text-[18px] font-semibold text-black leading-[1.3]">
                <p>이번 성취로</p>
                <p>특별한 사탕을 얻었어요!</p>
              </div>
            </div>

            {/* 메모 입력 영역 */}
            <div className="mt-4 rounded-[16px] border border-[#B1B1B1] bg-white p-4 min-h-[295px]">
              <textarea
                className="w-full h-full min-h-[260px] resize-none text-[16px] text-black placeholder:text-[#909090] focus:outline-none"
                placeholder={`"${item.content}" 목표 성취 완료!`}
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </div>

            {/* 이미지 업로드 영역 */}
            <div className="flex gap-3 mt-4">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  className="w-[80px] h-[80px] rounded-[8px] border border-[#D5D5D5] bg-[#F8F8F8] flex items-center justify-center"
                >
                  {index === 0 && <ImageAddIcon />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 사탕 만들기 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 w-full py-4 rounded-[12px] bg-[#FC8080] text-[18px] font-bold text-white leading-[1.3] disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Spinner size="sm" className="text-white" />
            저장 중...
          </>
        ) : (
          "사탕 만들기"
        )}
      </button>
    </div>
  );
}
