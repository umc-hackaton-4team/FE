import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { API_ENDPOINTS } from "../../api/endpoints";
import { useToastStore } from "../../store/toastStore";
import { Spinner } from "../../components/common/Spinner";
import type { User } from "../../types/user";
import type { DailyConditionRequest } from "../../types/dailyCondition";
import type { ApiResponse } from "../../types/api";

export default function SwipePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const surveyData = location.state as Omit<DailyConditionRequest, "description"> | undefined;
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // surveyData가 없으면 뒤로 이동 + toast
  useEffect(() => {
    if (!surveyData) {
      addToast("설문 데이터가 없습니다.", "error");
      navigate("/survey");
    }
  }, [surveyData, addToast, navigate]);

  // 로그인한 사용자 정보 가져오기
  useEffect(() => {
    api
      .get<ApiResponse<User>>(API_ENDPOINTS.USERS.ME)
      .then((res) => setUser(res.data.data))
      .catch((err) => {
        console.error(err);
        addToast("사용자 정보를 가져오지 못했습니다.", "error");
      });
  }, [addToast]);

  const handleSubmit = async () => {
    if (!surveyData) return;

    setLoading(true);

    const payload: DailyConditionRequest = {
      ...surveyData,
      description,
    };

    try {
      await api.post(API_ENDPOINTS.CONDITIONS.BASE, payload);
      addToast("오늘 상태가 저장되었습니다!", "success");
      navigate("/pick/loading");
    } catch (err: unknown) {
      console.error(err);

      // 409 Conflict - 이미 오늘 condition을 제출함
      const axiosError = err as { response?: { status?: number } };
      if (axiosError.response?.status === 409) {
        addToast("이미 오늘의 설문을 완료했어요! 추천 결과를 확인하세요.", "info");
        navigate("/pick/result", { replace: true });
        return;
      }

      addToast("요청이 잘못되었어요!", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!surveyData) return null; 
  return (
    <div className="flex h-full flex-col bg-[#FFFCF7] px-4 py-6">
      {/* 제목 */}
      <section className="w-full">
        <p className="text-[24px] font-bold leading-[1.3] text-black">
          요즘 특히나 <br />
          힘든 점이 있다면 알려주세요!
        </p>
      </section>

      {/* 텍스트 입력 영역 */}
      <div className="mt-4 h-[516px] w-full rounded-[16px] border border-[#B1B1B1] bg-white p-5">
        <textarea
          className="h-full w-full resize-none text-[16px] leading-[1.5] text-[#222] placeholder:text-[#909090] focus:outline-none"
          placeholder={`${
            user?.name ?? "User"
          }님이 지금까지 쓴 행복 기록에서 비슷한 내용을 참고해서 소확행을 추천해드릴게요. (선택)`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* 버튼 영역 */}
      <div className="mt-6 flex w-full gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-[111px] rounded-[12px] bg-white py-4 text-[18px] font-bold leading-[1.3] text-[#464646] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)]"
        >
          이전
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex flex-1 items-center justify-center gap-2 rounded-[12px] bg-[#FC8080] py-4 text-[18px] font-bold leading-[1.3] text-white disabled:opacity-50"
        >
          {loading ? (
            <>
              <Spinner size="sm" className="text-white" />
              처리 중...
            </>
          ) : (
            "오늘의 사탕 뽑기"
          )}
        </button>
      </div>
    </div>
  );
}
