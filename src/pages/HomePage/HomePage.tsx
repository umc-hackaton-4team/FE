import { useEffect, useRef, useState } from "react";
import axios from "axios";

import type { User } from "../../types/user";
import type { DailyConditionRequest } from "../../types/dailyCondition";
import FooterBar from "../../components/Layout/Footer";

const COLORS = [
  { name: "red", className: "bg-red-300" },
  { name: "orange", className: "bg-orange-300" },
  { name: "yellow", className: "bg-yellow-200" },
  { name: "green", className: "bg-green-300" },
  { name: "blue", className: "bg-blue-300" },
];

export default function RecordPage() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("red");
  const [images, setImages] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<DailyConditionRequest>({
    energyLevel: "NORMAL",
    availableTime: "MODERATE",
    spendingLevel: "LIGHT",
    activityLocation: "OUTSIDE",
    description: "",
  });

  const today = new Date();
  const dateText = `${today.getMonth() + 1} / ${today.getDate()} ${
    ["일", "월", "화", "수", "목", "금", "토"][today.getDay()]
  }요일`;

  /* 유저 정보 조회 */
  useEffect(() => {
    axios.get("https://goodgame.snowfrost.kr/api/users/me").then((res) => {
      setUser(res.data.data);
    });
  }, []);

  /* 이미지 선택 */
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const merged = [...images, ...selectedFiles].slice(0, 4);

    setImages(merged);
    e.target.value = "";
  };

  /* 저장 */
  const handleSubmit = async () => {
    try {
      await axios.post("", form);
      alert("오늘 기록이 저장되었어요 🌱");
    } catch {
      alert("이미 오늘 기록을 작성했어요!");
    }
  };

  return (
    <div className="relative mx-auto min-h-screen max-w-[430px] bg-[#FFF8F6]">
      <main className="mx-auto w-full max-w-[430px] px-5 pb-24">
        {/* 인사 */}
        <section className="pt-6">
          <p className="text-lg font-semibold">
            안녕하세요, {user?.name ?? "User"} 님!
          </p>
          <p className="text-lg font-semibold">
            오늘은 어떤 행복이 있었나요?
          </p>
        </section>

        {/* 컬러 선택 */}
        <section className="mt-6">
          <p className="mb-3 text-sm font-semibold">
            오늘은 어떤 색으로 기록을 꾸며볼까요?
          </p>

          <div className="flex gap-3">
            {COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`h-10 w-10 rounded-full ${color.className} ${
                  selectedColor === color.name
                    ? "ring-2 ring-black"
                    : ""
                }`}
              />
            ))}
          </div>
        </section>

        {/* 기록 카드 */}
        <section className="mt-4 rounded-2xl bg-white p-4 shadow">
          <p className="mb-2 text-sm font-medium">{dateText}</p>

          <textarea
            placeholder="오늘 있었던 행복한 일을 기록해보세요!"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="h-40 w-full resize-none rounded-lg border p-3 text-sm focus:outline-none"
          />

          {/* 이미지 업로드 */}
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium">
              사진 추가 (최대 4장)
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />

            <div className="grid grid-cols-4 gap-3">
              {/* 미리보기 */}
              {images.map((file, idx) => (
                <div
                  key={idx}
                  className="relative h-20 w-full overflow-hidden rounded-xl"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== idx))
                    }
                    className="absolute right-1 top-1 rounded-full bg-black/60 px-1 text-xs text-white"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* 추가 버튼 */}
              {images.length < 4 && (
                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="flex h-20 w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white text-gray-400"
                >
                  <span className="text-2xl">＋</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 저장 버튼 */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full rounded-xl bg-red-400 py-4 font-semibold text-white"
        >
          기록 저장하기
        </button>
      </main>

      <FooterBar />
    </div>
  );
}
