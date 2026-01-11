import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { API_ENDPOINTS } from "../../api/endpoints";
import { toast } from "../../store/toastStore";
import { Spinner } from "../../components/common/Spinner";
import BatteryFull from "../../assets/icons/battery-full.svg";
import BatteryHalf from "../../assets/icons/battery-half.svg";
import BatteryEmpty from "../../assets/icons/battery-empty.svg";
import type {
  EnergyLevel,
  AvailableTime,
  SpendingLevel,
  ActivityLocation,
} from "../../types/dailyCondition";

type ConditionForm = {
  energyLevel: EnergyLevel;
  availableTime: AvailableTime;
  spendingLevel: SpendingLevel;
  activityLocation: ActivityLocation;
};

type EnergyOption = {
  label: string;
  value: EnergyLevel;
  icon: string;
};

const energyOptions: EnergyOption[] = [
  { label: "풀 충전 상태", value: "FULL", icon: BatteryFull },
  { label: "보통", value: "NORMAL", icon: BatteryHalf },
  { label: "방전..", value: "DEPLETED", icon: BatteryEmpty },
];

export default function SurveyPage() {
  const navigate = useNavigate();
  const [checkingCondition, setCheckingCondition] = useState(true);

  const [form, setForm] = useState<ConditionForm>({
    energyLevel: "FULL",
    availableTime: "MODERATE",
    spendingLevel: "LIGHT",
    activityLocation: "HOME",
  });

  // 오늘 이미 condition을 제출했는지 확인
  useEffect(() => {
    const checkExistingCondition = async () => {
      try {
        await api.get(API_ENDPOINTS.CONDITIONS.BASE);
        // 성공하면 이미 오늘 condition이 있음 → 결과 페이지로 이동
        toast.info("이미 오늘의 설문을 완료했어요! 추천 결과를 확인하세요.");
        navigate("/pick/result", { replace: true });
      } catch {
        // 404면 오늘 condition이 없음 → 설문 진행
        // 다른 에러는 무시하고 설문 진행
        setCheckingCondition(false);
      }
    };

    checkExistingCondition();
  }, [navigate]);

  const handleSubmit = () => {
    navigate("/pick/swipe", { state: form });
  };

  // 기존 condition 체크 중일 때 로딩 표시
  if (checkingCondition) {
    return (
      <div className="flex h-full items-center justify-center bg-[#FFFCF7]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-[#FFFCF7] px-4 pb-6">
      {/* 제목 */}
      <section className="pt-6">
        <p className="text-[24px] font-bold leading-[1.3] text-black">두근두근</p>
        <p className="text-[24px] font-bold leading-[1.3] text-black">
          오늘, 어떤 행복을 만들어 볼까요?
        </p>
      </section>

      {/* Q1. 에너지 상태 - 큰 박스 + 아이콘 */}
      <section className="mt-8">
        <p className="mb-3 text-[16px] font-semibold text-[#222]">
          Q1. 지금 나의 에너지 상태는?
        </p>
        <div className="grid grid-cols-3 gap-3">
          {energyOptions.map((opt) => {
            const active = form.energyLevel === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setForm({ ...form, energyLevel: opt.value })}
                className={`flex h-[85px] flex-col items-center justify-center gap-1 rounded-[10px] border-[1.5px] ${
                  active
                    ? "border-[#FC8080] bg-[#FFF8F6]"
                    : "border-[#E6E6E6] bg-white"
                }`}
              >
                <img
                  src={opt.icon}
                  alt={opt.label}
                  className={`h-7 w-7 ${active ? "text-[#FC8080]" : "text-[#464646]"}`}
                  style={{ filter: active ? "invert(60%) sepia(50%) saturate(1000%) hue-rotate(315deg)" : "none" }}
                />
                <span
                  className={`text-[14px] leading-[1.5] ${
                    active ? "font-bold text-[#FC8080]" : "font-normal text-[#464646]"
                  }`}
                >
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Q2. 투자 시간 */}
      <section className="mt-8">
        <p className="mb-3 text-[16px] font-semibold text-[#222]">
          Q2. 내가 소확행에 투자할 수 있는 시간은?
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "10분 내외", value: "SHORT" as const },
            { label: "1시간 내외", value: "MODERATE" as const },
            { label: "반나절 또는 하루", value: "HALF_DAY" as const },
          ].map((opt) => {
            const active = form.availableTime === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setForm({ ...form, availableTime: opt.value })}
                className={`h-[52px] rounded-[8px] border text-[14px] leading-[1.5] ${
                  active
                    ? "border-[#FC8080] bg-[#FFF8F6] font-bold text-[#FC8080]"
                    : "border-[#E6E6E6] bg-white font-normal text-[#464646]"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Q3. 돈 쓸 수 있는 정도 */}
      <section className="mt-8">
        <p className="mb-3 text-[16px] font-semibold text-[#222]">
          Q3. 오늘 나는 얼마나 돈을 쓸 수 있나요?
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "무지출", value: "FREE" as const },
            { label: "가벼운 소비", value: "LIGHT" as const },
            { label: "많이 써보자!", value: "HEAVY" as const },
          ].map((opt) => {
            const active = form.spendingLevel === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setForm({ ...form, spendingLevel: opt.value })}
                className={`h-[52px] rounded-[8px] border text-[14px] leading-[1.5] ${
                  active
                    ? "border-[#FC8080] bg-[#FFF8F6] font-bold text-[#FC8080]"
                    : "border-[#E6E6E6] bg-white font-normal text-[#464646]"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Q4. 장소 */}
      <section className="mt-8">
        <p className="mb-3 text-[16px] font-semibold text-[#222]">
          Q4. 어디서 행복을 찾고 계시나요?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "집 안 또는 실내", value: "HOME" as const },
            { label: "야외로 나가자!", value: "OUTSIDE" as const },
          ].map((opt) => {
            const active = form.activityLocation === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setForm({ ...form, activityLocation: opt.value })}
                className={`h-[52px] rounded-[8px] border text-[14px] leading-[1.5] ${
                  active
                    ? "border-[#FC8080] bg-[#FFF8F6] font-bold text-[#FC8080]"
                    : "border-[#E6E6E6] bg-white font-normal text-[#464646]"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 다음 단계 버튼 */}
      <button
        onClick={handleSubmit}
        className="mt-10 w-full rounded-[12px] bg-[#FC8080] py-4 text-[18px] font-bold leading-[1.3] text-white"
      >
        다음 단계
      </button>
    </div>
  );
}
