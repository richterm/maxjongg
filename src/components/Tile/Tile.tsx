import React, { FC } from "react";
import * as THREE from "three";
import type { TileValue } from "../../types";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Edges } from "@react-three/drei";

type TileProps = {
  value?: TileValue;
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
  lightblue = "hsl(263, 27%, 68%)",
  darkblue = "hsl(263, 27%, 18%)",
}

export const Tile: FC<TileProps> = ({
  value,
  x,
  y,
  z,
  hinted = false,
  selected = false,
  onClick = () => {},
}) => {
  const map = useLoader(TextureLoader, `/png/${value}.png`);
  if (!value) return null;
  map.repeat = new THREE.Vector2(1, 1);
  map.center = new THREE.Vector2(0, 0.5);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  const material1 = new THREE.MeshPhongMaterial({
    map,
    emissive: selected || hinted ? Color.lightblue : Color.darkblue,
  });

  const material2 = new THREE.MeshPhongMaterial({
    emissive: selected || hinted ? Color.lightblue : Color.darkblue,
  });

  return (
    <mesh
      position={[x, y, z]}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      material={[
        material2,
        material2,
        material2,
        material2,
        material1,
        material2,
      ]}
    >
      <boxGeometry args={[width, height, depth]} attach="geometry" />
      <Edges
        scale={1}
        color={selected || hinted ? Color.darkblue : Color.lightblue}
      />
    </mesh>
  );
};
