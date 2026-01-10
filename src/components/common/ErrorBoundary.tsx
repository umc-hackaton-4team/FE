import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "./Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 text-center">
          <div className="text-4xl mb-4">😵</div>
          <h2 className="text-xl font-semibold text-gray-8 mb-2">
            문제가 발생했습니다
          </h2>
          <p className="text-gray-6 mb-4">
            잠시 후 다시 시도해주세요.
          </p>
          <Button onClick={this.handleRetry} variant="primary">
            다시 시도
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
