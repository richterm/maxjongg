import { FC } from "react";
import type { TileValue } from "shared";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Edges } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

type TileProps = {
  visible: boolean;
  value: TileValue;
  x: number;
  y: number;
  z: number;
  hinted?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

const height = 2;
const width = 2;
const depth = 1;

enum Color {
  light = "hsl(263, 27%, 58%)",
  dark = "hsl(263, 27%, 18%)",
}

const AnimatedMeshPhysicalMaterial = animated.meshPhysicalMaterial;
const AnimatedEdges = animated(Edges);

export const Tile: FC<TileProps> = ({
  visible,
  value,
  x,
  y,
  z,
  hinted = false,
  selected = false,
  onClick,
}) => {
  const scaleSpring = useSpring({ scale: visible ? 1 : 0 });
  const colorSpring = useSpring({
    emissive: selected || hinted ? Color.light : Color.dark,
    edgesColor: selected || hinted ? Color.dark : Color.light,
  });
  const normalMap = useLoader(TextureLoader, `/png/bark_willow_nor_gl_1k.jpg`);
  const map = useLoader(TextureLoader, `/png/${value}.png`);

  return (
    <animated.mesh
      position={[x, y, z]}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      scale={scaleSpring.scale}
    >
      <boxGeometry args={[width, height, depth]} attach="geometry" />
      {/* @ts-expect-error foo */}
      <AnimatedMeshPhysicalMaterial
        clearcoat={0.1}
        clearcoatRoughness={0.4}
        normalMap={normalMap}
        emissive={colorSpring.emissive}
        attach="material-0"
      />
      <AnimatedMeshPhysicalMaterial
        clearcoat={0.1}
        clearcoatRoughness={0.4}
        normalMap={normalMap}
        emissive={colorSpring.emissive}
        attach="material-1"
      />
      <AnimatedMeshPhysicalMaterial
        clearcoat={0.1}
        clearcoatRoughness={0.4}
        normalMap={normalMap}
        emissive={colorSpring.emissive}
        attach="material-2"
      />
      <AnimatedMeshPhysicalMaterial
        clearcoat={0.1}
        clearcoatRoughness={0.4}
        normalMap={normalMap}
        emissive={colorSpring.emissive}
        attach="material-3"
      />
      <AnimatedMeshPhysicalMaterial
        clearcoat={0.1}
        clearcoatRoughness={0.4}
        normalMap={normalMap}
        emissive={colorSpring.emissive}
        map={map}
        attach="material-4"
      />
      <AnimatedMeshPhysicalMaterial
        clearcoat={0.1}
        clearcoatRoughness={0.4}
        normalMap={normalMap}
        emissive={colorSpring.emissive}
        attach="material-5"
      />
      <AnimatedEdges scale={1} color={colorSpring.edgesColor} />
    </animated.mesh>
  );
};
