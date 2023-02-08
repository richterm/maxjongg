import { FC } from "react";
import type { TileValue } from "../../types";
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
  lightblue = "hsl(263, 27%, 52%)",
  darkblue = "hsl(263, 27%, 18%)",
}

const AnimatedMeshPhongMaterial = animated.meshPhongMaterial;
const AnimatedEdges = animated(Edges);

export const Tile: FC<TileProps> = ({
  visible,
  value,
  x,
  y,
  z,
  hinted = false,
  selected = false,
  onClick = () => {},
}) => {
  const scaleSpring = useSpring({ scale: visible ? 1 : 0 });
  const colorSpring = useSpring({
    emissive: selected || hinted ? Color.lightblue : Color.darkblue,
    edgesColor: selected || hinted ? Color.darkblue : Color.lightblue,
  });
  const map = useLoader(TextureLoader, `/png/${value}.png`);

  return (
    <animated.mesh
      position={[x, y, z]}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      scale={scaleSpring.scale}
    >
      <boxGeometry args={[width, height, depth]} attach="geometry" />
      {/* @ts-ignore */}
      <AnimatedMeshPhongMaterial
        emissive={colorSpring.emissive}
        attach="material-0"
      />
      <AnimatedMeshPhongMaterial
        emissive={colorSpring.emissive}
        attach="material-1"
      />
      <AnimatedMeshPhongMaterial
        emissive={colorSpring.emissive}
        attach="material-2"
      />
      <AnimatedMeshPhongMaterial
        emissive={colorSpring.emissive}
        attach="material-3"
      />
      <AnimatedMeshPhongMaterial
        emissive={colorSpring.emissive}
        map={map}
        attach="material-4"
      />
      <AnimatedMeshPhongMaterial
        emissive={colorSpring.emissive}
        attach="material-5"
      />
      <AnimatedEdges scale={1} color={colorSpring.edgesColor} />
    </animated.mesh>
  );
};
