import { FC } from "react";
import {
  TileValue,
  TILE_WIDTH,
  TILE_HEIGHT,
  TILE_DEPTH,
  getTileColors,
} from "shared";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Box, Edges } from "@react-three/drei";
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

const AnimatedBox = animated(Box);
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
  const { edges, faces } = getTileColors({
    darkMode: true,
    selected,
    hinted,
  });
  const scaleSpring = useSpring({ scale: visible ? 1 : 0 });
  const colorSpring = useSpring({
    emissive: faces,
  });
  const normalMap = useLoader(TextureLoader, `/png/bark_willow_nor_gl_1k.jpg`);
  const map = useLoader(TextureLoader, `/png/${value}.png`);

  return (
    <AnimatedBox
      position={[x, y, z]}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      scale={scaleSpring.scale}
    >
      <boxGeometry
        args={[TILE_WIDTH, TILE_HEIGHT, TILE_DEPTH]}
        attach="geometry"
      />
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
      <AnimatedEdges scale={1} color={edges} />
    </AnimatedBox>
  );
};
