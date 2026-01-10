import { useEffect, useRef, useState } from "react";
import { api } from "../../api/ axios";
import type { User } from "../../types/user";

const COLORS = [
  { name: "YELLOW", className: "bg-[#FFD588]" },
  { name: "ORANGE", className: "bg-[#FFA15D]" },
  { name: "PINK", className: "bg-[#FFBACB]" },
  { name: "GREEN", className: "bg-[#C9E893]" },
  { name: "MINT", className: "bg-[#9FEAE0]" },
];

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState("YELLOW");
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const today = new Date();
  const dateText = `${today.getMonth() + 1} / ${today.getDate()} ${
    ["일", "월", "화", "수", "목", "금", "토"][today.getDay()]
  }요일`;

  useEffect(() => {
    api.get("/api/users/me").then((res) => {
      setUser(res.data.data);
    });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return; 

  setImages((prev) =>
    [...prev, ...Array.from(files)].slice(0, 4)
  );

  e.target.value = "";
};


  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append(
        "request",
        new Blob(
          [
            JSON.stringify({
              content,
              candyColor: selectedColor,
            }),
          ],
          { type: "application/json" }
        )
      );

      images.forEach((img) => formData.append("images", img));

      await api.post("/api/memories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("기록이 저장되었어요 🌱");
      setContent("");
      setImages([]);
    } catch {
      alert("이미 오늘 기록을 작성했어요!");
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#FFFCF7] px-4 pt-4 pb-[88px]">
      {/* 인사 */}
      <section>
        <p className="text-lg font-bold">
          안녕하세요, {user?.name ?? "User"} 님!
        </p>
        <p className="text-lg font-bold">
          오늘은 어떤 행복이 있었나요?
        </p>
      </section>

      {/* 날짜 */}
      <div className="mt-3 inline-block w-fit rounded-full bg-white px-3 py-1 text-xs shadow">
        {dateText}
      </div>

      {/* 카드 */}
      <section className="mt-4 flex flex-1 flex-col rounded-2xl bg-white p-4 shadow">
        <p className="mb-3 text-sm font-semibold">
          어떤 색의 사탕을 만들어 볼까요?
        </p>

        {/* 색상 */}
        <div className="mb-4 flex gap-3">
          {COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedColor(c.name)}
              className={`h-8 w-8 rounded-full ${c.className} ${
                selectedColor === c.name ? "ring-2 ring-black" : ""
              }`}
            />
          ))}
        </div>

        {/* textarea */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="이번 기록은 분명 멋진 재료가 될 거예요!"
          className="flex-1 resize-none rounded-2xl border border-gray-200 p-4 text-sm focus:outline-none"
        />

        {/* 이미지 */}
        <div className="mt-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />

          <div className="grid grid-cols-4 gap-3">
            {images.map((file, idx) => (
              <div
                key={idx}
                className="relative h-20 rounded-xl border overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}

            {images.length < 4 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-20 items-center justify-center rounded-xl border text-gray-400"
              >
                +
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 저장 버튼 */}
      <button
        onClick={handleSubmit}
        className="mt-4 rounded-xl bg-[#FF7A7A] py-4 font-semibold text-white"
      >
        기록 저장하기
      </button>
    </div>
  );
}
