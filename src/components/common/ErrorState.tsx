import { memo } from "react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

function ErrorState({
  title = "오류가 발생했습니다",
  message = "잠시 후 다시 시도해주세요",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {/* 에러 아이콘 */}
      <div className="mb-4">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="20" stroke="#FC8080" strokeWidth="3" />
          <path
            d="M24 16V26"
            stroke="#FC8080"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="24" cy="32" r="2" fill="#FC8080" />
        </svg>
      </div>

      <h3 className="text-body1 font-semibold text-gray-8">{title}</h3>
      <p className="mt-2 text-body2 text-gray-6">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-body2 font-medium text-white transition-colors hover:bg-primary/90"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.65 2.35A8 8 0 1 0 16 8h-2a6 6 0 1 1-1.76-4.24L10 6h6V0l-2.35 2.35Z"
              fill="currentColor"
            />
          </svg>
          다시 시도
        </button>
      )}
    </div>
  );
}

export default memo(ErrorState);
