import { memo } from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon && <div className="mb-4 text-gray-5">{icon}</div>}
      <h3 className="text-body1 font-semibold text-gray-7">{title}</h3>
      {description && (
        <p className="mt-2 text-body2 text-gray-6">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-body2 font-medium text-white transition-colors hover:bg-primary/90"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export default memo(EmptyState);
