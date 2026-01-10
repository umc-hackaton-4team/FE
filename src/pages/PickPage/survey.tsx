import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OptionBox from "../../components/common/OptionBox";

type ConditionForm = {
  energyLevel: "LOW" | "NORMAL" | "HIGH";
  availableTime: "SHORT" | "MODERATE" | "LONG";
  spendingLevel: "NONE" | "LIGHT" | "HEAVY";
  activityLocation: "INSIDE" | "OUTSIDE" | "ANY";
};

export default function SurveyPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<ConditionForm>({
    energyLevel: "NORMAL",
    availableTime: "MODERATE",
    spendingLevel: "LIGHT",
    activityLocation: "ANY",
  });

  const handleSubmit = () => {
    navigate("/pick/swipe", { state: form });
  };

  return (
    <div className="bg-[#FFFCF7] px-5 pb-24">
      <section className="pt-6">
        <p className="text-xl font-bold">두근두근</p>
        <p className="text-xl font-bold">
          오늘, 어떤 행복을 만들어 볼까요?
        </p>
      </section>

      <OptionBox
        title="Q1. 지금 나의 에너지 상태는?"
        options={[
          { label: "풀 충전 상태", value: "HIGH" },
          { label: "보통", value: "NORMAL" },
          { label: "방전..", value: "LOW" },
        ]}
        selected={form.energyLevel}
        onSelect={(v) => setForm({ ...form, energyLevel: v })}
      />

      <OptionBox
        title="Q2. 내가 소확행에 투자할 수 있는 시간은?"
        options={[
          { label: "10분 내외", value: "SHORT" },
          { label: "1시간 내외", value: "MODERATE" },
          { label: "여유롭게", value: "LONG" },
        ]}
        selected={form.availableTime}
        onSelect={(v) => setForm({ ...form, availableTime: v })}
      />

      <OptionBox
        title="Q3. 오늘 나는 얼마나 돈을 쓸 수 있나요?"
        options={[
          { label: "무지출", value: "NONE" },
          { label: "가벼운 소비", value: "LIGHT" },
          { label: "많이 써보자!", value: "HEAVY" },
        ]}
        selected={form.spendingLevel}
        onSelect={(v) => setForm({ ...form, spendingLevel: v })}
      />

      <OptionBox
        title="Q4. 어디서 행복을 찾고 계시나요?"
        options={[
          { label: "집 안 또는 실내", value: "INSIDE" },
          { label: "야외로 나가자!", value: "OUTSIDE" },
          { label: "상관 없어요.", value: "ANY" },
        ]}
        selected={form.activityLocation}
        onSelect={(v) => setForm({ ...form, activityLocation: v })}
      />

      <button
        onClick={handleSubmit}
        className="mt-8 w-full rounded-xl bg-[#FC8080] py-4 font-semibold text-white"
      >
        다음 단계
      </button>
    </div>
  );
}
