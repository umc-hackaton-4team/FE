import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { useToastStore } from "../../store/toastStore";
import { Spinner } from "../../components/common/Spinner";

type ConditionForm = {
  energyLevel: "LOW" | "NORMAL" | "HIGH";
  availableTime: "SHORT" | "MODERATE" | "LONG";
  spendingLevel: "NONE" | "LIGHT" | "HEAVY";
  activityLocation: "INSIDE" | "OUTSIDE" | "ANY";
  description: string;
};

type User = {
  id: number;
  email: string;
  name: string;
  profileImage: string;
};

export default function SwipePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const surveyData = location.state as Omit<ConditionForm, "description"> | undefined;
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
      .get("/users/me")
      .then((res) => setUser(res.data.data))
      .catch((err) => {
        console.error(err);
        addToast("사용자 정보를 가져오지 못했습니다.", "error");
      });
  }, [addToast]);

  const handleSubmit = async () => {
    if (!surveyData) return;

    setLoading(true);

    const payload: ConditionForm = {
      ...surveyData,
      description,
    };

    try {
      await api.post("/conditions", payload);
      addToast("오늘 상태가 저장되었습니다!", "success");
      navigate("/pick/loading");
    } catch (err: unknown) {
      console.error(err);
      console.log("Sending payload:", payload);
      addToast(
        "요청이 잘못되었어요!",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!surveyData) return null; 
  return (
    <div className="flex h-full flex-col items-center bg-[#FFFDF6] px-4 py-6">
      <section className="w-full max-w-[398px]">
        <p className="text-[24px] font-semibold">
          요즘 특히나 <br />
          힘든 점이 있다면 알려주세요!
        </p>
      </section>

      <textarea
        className="mt-4 h-[516px] w-full max-w-[398px] resize-none rounded-2xl border bg-white p-4 text-sm text-[#909090] focus:outline-none"
        placeholder={`${
          user?.name ?? "User"
        }님이 지금까지 쓴 행복 기록에서 비슷한 내용을 참고해서 소확행을 추천해드릴게요. (선택)`}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="mt-6 flex w-full max-w-[398px] gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-1/3 rounded-xl border py-3 text-sm font-medium"
        >
          이전
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-400 py-3 text-sm font-semibold text-white disabled:opacity-50"
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
