import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/ axios";

type User = {
  id: number;
  name: string;
};

type ConditionForm = {
  description: string;
};

export default function PickConditionPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const [form, setForm] = useState<ConditionForm>({
    description: "",
  });

  useEffect(() => {
    api.get("/users/me").then((res) => {
      setUser(res.data.data);
    });
  }, []);

  const handleSubmit = async () => {
    try {
      await api.post("/conditions", form);
      navigate("/pick/loading");
    } catch {
      alert("오늘은 이미 상태를 저장했어요!");
    }
  };

  return (
    <div className="h-full bg-[#FFFDF6] px-4 py-6 flex flex-col items-center">
    <section className="w-full max-w-[398px]">
        <p className="text-lg font-semibold text-[24px]">
        요즘 특히나 <br /> 힘든 점이 있다면 알려주세요!
        </p>
    </section>

    <textarea
        className="mt-4 w-full bg-white max-w-[398px] h-[516px] resize-none rounded-2xl border p-4 text-sm focus:outline-none text-[#909090]"
        placeholder={`${user?.name ?? "User"}님이 지금까지 쓴 행복 기록에서 비슷한 내용을 참고해서 소확행을 추천해드릴게요. (선택)`}
        value={form.description}
        onChange={(e) =>
        setForm({ ...form, description: e.target.value })
        }
    />

    <div className="mt-6 w-full max-w-[398px] flex gap-3">
        <button
        onClick={() => navigate(-1)}
        className="w-1/3 rounded-xl border py-3 text-sm font-medium"
        >
        이전
        </button>

        <button
        onClick={handleSubmit}
        className="flex-1 rounded-xl bg-red-400 py-3 text-sm font-semibold text-white"
        >
        오늘의 사탕 뽑기
        </button>
    </div>
    </div>
  );
}
