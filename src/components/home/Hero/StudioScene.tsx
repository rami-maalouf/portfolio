import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";

interface StudioProps {
  onReady?: () => void;
  onExplore: () => void;
}

function Camera({ onExplore }: Pick<StudioProps, "onExplore">) {
  const camera = useRef<Group>(null!);
  const [hovered, setHovered] = useState(false);
  useFrame(({ invalidate }, delta) => {
    if (Math.abs(camera.current.position.y - (hovered ? .32 : .12)) > .001 || Math.abs(camera.current.rotation.y - (hovered ? -.12 : -.28)) > .001) invalidate();
    camera.current.position.y = MathUtils.damp(camera.current.position.y, hovered ? .32 : .12, 8, delta);
    camera.current.rotation.y = MathUtils.damp(camera.current.rotation.y, hovered ? -.12 : -.28, 6, delta);
  });
  return (
    <group ref={camera} rotation={[0, -.28, 0]} position={[0, .12, 0]}
      onClick={(event) => { event.stopPropagation(); onExplore(); }}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}>
      <mesh castShadow><boxGeometry args={[2.65, 1.65, .85]} /><meshStandardMaterial color="#57776e" roughness={.55} metalness={.1} /></mesh>
      <mesh position={[.95, 0, .12]} castShadow><boxGeometry args={[.55, 1.75, 1.05]} /><meshStandardMaterial color="#314840" roughness={.85} /></mesh>
      <mesh position={[-.18, 0, .65]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[.68, .68, .65, 48]} /><meshStandardMaterial color="#111f22" metalness={.7} roughness={.3} /></mesh>
      <mesh position={[-.18, 0, 1.0]}><torusGeometry args={[.57, .045, 12, 64]} /><meshStandardMaterial color="#83d9d5" metalness={.7} roughness={.2} /></mesh>
      <mesh position={[-.18, 0, 1.02]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.52, .52, .025, 48]} /><meshStandardMaterial color="#22536a" emissive="#153e50" emissiveIntensity={.5} metalness={.3} roughness={.2} /></mesh>
      <mesh position={[-.3, .98, 0]} castShadow><boxGeometry args={[.85, .35, .65]} /><meshStandardMaterial color="#485a56" metalness={.5} roughness={.4} /></mesh>
      <mesh position={[.88, .96, 0]}><cylinderGeometry args={[.14, .14, .15, 20]} /><meshStandardMaterial color="#d6ab78" metalness={.5} roughness={.4} /></mesh>
      <mesh position={[-.98, .53, .44]}><sphereGeometry args={[.065, 12, 12]} /><meshStandardMaterial color="#f29a77" emissive="#e46c43" emissiveIntensity={.5} /></mesh>
    </group>
  );
}

function Ready({ onReady }: Pick<StudioProps, "onReady">) {
  const ready = useRef(false);
  useFrame(() => { if (!ready.current) { ready.current = true; onReady?.(); } });
  return null;
}

export default function StudioScene({ onReady, onExplore }: StudioProps) {
  return (
    <Canvas frameloop="demand" shadows dpr={[1, 1.5]} camera={{ position: [4, 3, 6], fov: 38 }} gl={{ antialias: true }}>
      <hemisphereLight args={["#d7eee4", "#74543e", 2]} />
      <directionalLight position={[2, 6, 4]} intensity={3} color="#ffdbad" castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 2, 0]} intensity={2} color="#83e4e4" />
      <group position={[0, .05, 0]}>
        <Camera onExplore={onExplore} />
        <mesh position={[0, -.85, 0]} receiveShadow><cylinderGeometry args={[2.6, 2.65, .22, 64]} /><meshStandardMaterial color="#82664d" roughness={.85} /></mesh>
        <mesh position={[-1.2, -.67, -.95]} rotation={[0, -.3, 0]} castShadow><boxGeometry args={[.85, .14, 1.1]} /><meshStandardMaterial color="#c3a77e" /></mesh>
        <mesh position={[-1.2, -.58, -.95]} rotation={[0, -.3, 0]}><boxGeometry args={[.9, .04, 1.15]} /><meshStandardMaterial color="#557b71" /></mesh>
      </group>
      <Ready onReady={onReady} />
    </Canvas>
  );
}
