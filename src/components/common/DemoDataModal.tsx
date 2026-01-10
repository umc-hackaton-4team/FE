import { useState } from "react";
import { api } from "../../api/axios";
import { toast } from "../../store/toastStore";
import { Spinner } from "./Spinner";

interface DemoDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoDataModal = ({ isOpen, onClose }: DemoDataModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleYes = async () => {
    setIsLoading(true);
    try {
      // 3개의 mock API를 병렬로 호출
      await Promise.all([
        api.post("/mock/recommendations"),
        api.post("/mock/memories"),
        api.post("/mock/conditions"),
      ]);
      toast.success("데모 데이터가 성공적으로 생성되었어요!");
      onClose();
    } catch (error) {
      console.error("데모 데이터 생성 실패:", error);
      toast.error("데모 데이터 생성에 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNo = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-center text-lg font-bold">데모데이 테스트</h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          데모데이 테스트를 위해서
          <br />
          미리 과거의 데이터를 채워드릴까요?
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleNo}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
          >
            아니요
          </button>
          <button
            onClick={handleYes}
            disabled={isLoading}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FF7A7A] py-3 font-semibold text-white transition hover:bg-[#ff6b6b] disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Spinner size="sm" className="text-white" />
                생성 중...
              </>
            ) : (
              "예"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
