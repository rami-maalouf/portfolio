import { createRoot } from "react-dom/client";
import SceneSuspenseWrapper from "./SceneSuspenseWrapper";

export function mountScene(element: HTMLElement, callbacks: { onReady: () => void; onError: () => void; onExplore: () => void }) {
  const root = createRoot(element);
  root.render(<SceneSuspenseWrapper {...callbacks} />);
  return () => root.unmount();
}
