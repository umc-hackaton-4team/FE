import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import type { User } from "../../types/user";
import { toast } from "../../store/toastStore";
import imageCompression from "browser-image-compression";
import { Spinner } from "../../components/common/Spinner";
import { CANDY_COLORS, CANDY_COLOR_STYLES, type BasicCandyColor } from "../../constants/candy";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState<BasicCandyColor>("YELLOW");
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const today = new Date();
  const dateText = `${today.getMonth() + 1} / ${today.getDate()} ${
    ["일", "월", "화", "수", "목", "금", "토"][today.getDay()]
  }요일`;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data.data);
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
        toast.error("사용자 정보를 불러오지 못했어요");
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const compressedFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const compressed = await imageCompression(files[i], {
          maxSizeMB: 0.5, 
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
        compressedFiles.push(compressed);
      } catch (err) {
        console.error("이미지 압축 실패:", err);
      }
    }

    if (compressedFiles.length + images.length > 4) {
      toast.warning("이미지는 최대 4장까지 업로드 가능합니다!");
    }

    setImages((prev) =>
      [...prev, ...compressedFiles].slice(0, 4)
    );
    e.target.value = "";
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.warning("내용을 입력해주세요!");
      return;
    }

    if (isSubmitting) return; // 중복 클릭 방지

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      images.forEach((img) => formData.append("images", img));

      const query = encodeURIComponent(
        JSON.stringify({ content, candyColor: selectedColor })
      );

      await api.post(`/api/memories?request=${query}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("기록이 저장되었어요 🌱");
      setContent("");
      setImages([]);

      navigate("/todaycandy");
    } catch (err) {
      console.error(err);
      toast.error("이미 오늘 기록을 작성했거나 서버 오류가 발생했어요!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#FFFCF7] px-4 pb-[88px] pt-4">
      <section>
        <p className="text-lg font-bold">
          안녕하세요,{" "}
          {userLoading ? (
            <span className="inline-block h-5 w-16 animate-pulse rounded bg-gray-200" />
          ) : (
            user?.name ?? "User"
          )}{" "}
          님!
        </p>
        <p className="text-lg font-bold">오늘은 어떤 행복이 있었나요?</p>
      </section>

      <div className="mt-3 inline-block w-fit rounded-full bg-white px-3 py-1 text-xs shadow">
        {dateText}
      </div>

      <section className="mt-4 flex flex-1 flex-col rounded-2xl bg-white p-4 shadow">
        <p className="mb-3 text-sm font-semibold">
          어떤 색의 사탕을 만들어 볼까요?
        </p>

        <div className="mb-4 flex gap-3">
          {CANDY_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`h-8 w-8 rounded-full ${CANDY_COLOR_STYLES[color].bg} ${
                selectedColor === color ? "ring-2 ring-black" : ""
              }`}
            />
          ))}
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="이번 기록은 분명 멋진 재료가 될 거예요!"
          className="flex-1 resize-none rounded-2xl border border-gray-200 p-4 text-sm focus:outline-none"
        />

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
                className="relative h-20 overflow-hidden rounded-xl border"
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

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#FF7A7A] py-4 font-semibold text-white disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Spinner size="sm" className="text-white" />
            저장 중...
          </>
        ) : (
          "기록 저장하기"
        )}
      </button>
    </div>
  );
}
