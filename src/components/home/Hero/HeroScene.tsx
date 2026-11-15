import { Fragment, useRef, type HTMLAttributes } from "react";
import { useFrame } from "@react-three/fiber";
import Canvas from "@components/shared/threejs/Canvas";
import Areas from "./Areas";
import SecondScene from "./SecondScene";
import SphereLight from "./SphereLight";

interface HeroSceneProps extends HTMLAttributes<HTMLDivElement> {
  hideCallback?: boolean;
  hideTitle?: boolean;
  onReady?: () => void;
}

function SceneReady({ onReady }: { onReady?: () => void }) {
  const notified = useRef(false);
  useFrame(() => {
    if (notified.current) return;
    notified.current = true;
    requestAnimationFrame(() => onReady?.());
  });
  return null;
}

export default function HeroScene(props: HeroSceneProps) {
  const { hideCallback = false, hideTitle = false, onReady, ...rest } = props;

  return (
    <Canvas {...rest}>
      <Fragment>
        <ambientLight intensity={2.5} />
        {!hideTitle && <SecondScene />}
        <Areas />
        <SphereLight />
        <SceneReady onReady={onReady} />
      </Fragment>
    </Canvas>
  );
}
