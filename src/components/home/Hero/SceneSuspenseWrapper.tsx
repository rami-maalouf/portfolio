import { Component, type ErrorInfo, type ReactNode, Suspense, type HTMLAttributes } from "react";
import "@lib/setupThree";
import HeroScene from "./HeroScene";
import Loading from "./Loading";

interface HeroSceneProps extends Omit<HTMLAttributes<HTMLDivElement>, "onError"> {
  fallback?: JSX.Element;
  onReady?: () => void;
  onError?: () => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class SceneErrorBoundary extends Component<{ children: ReactNode; onError?: () => void }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Hero scene failed to load:", error, info);
    this.props.onError?.();
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[50vh] items-center justify-center p-8 text-center text-cyan-200">
          <p>3D scene failed to load. Try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function SceneSuspenseWrapper(props: HeroSceneProps) {
  const { children, fallback, onError, onReady, ...rest } = props;
  return (
    <SceneErrorBoundary onError={onError}>
      <div className="relative h-full w-full">
        <Suspense fallback={onReady ? null : (fallback ?? <Loading />)}>
          <HeroScene {...rest} onReady={onReady} />
        </Suspense>
      </div>
    </SceneErrorBoundary>
  );
}
