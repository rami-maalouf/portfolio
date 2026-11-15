import { Component, type ErrorInfo, type ReactNode } from "react";
import StudioScene from "./StudioScene";

interface StudioProps {
  onReady: () => void;
  onError: () => void;
  onExplore: () => void;
}

class SceneErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() { return { failed: true }; }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Studio scene failed to load:", error, info);
    this.props.onError();
  }

  render() { return this.state.failed ? null : this.props.children; }
}

export default function SceneSuspenseWrapper({ onError, onReady, onExplore }: StudioProps) {
  return (
    <SceneErrorBoundary onError={onError}>
      <StudioScene onReady={onReady} onExplore={onExplore} />
    </SceneErrorBoundary>
  );
}
