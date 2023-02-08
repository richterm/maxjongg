import React, { FC } from "react";
import * as THREE from "three";
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
  const spring = useSpring({ scale: visible ? 1 : 0 });
  const map = useLoader(TextureLoader, `/png/${value}.png`);
  map.repeat = new THREE.Vector2(1, 1);
  map.center = new THREE.Vector2(0, 0.5);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  return (
    <animated.mesh
      position={[x, y, z]}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      scale={spring.scale}
    >
      <boxGeometry args={[width, height, depth]} attach="geometry" />
      <meshPhongMaterial
        emissive={selected || hinted ? Color.lightblue : Color.darkblue}
        attach="material-0"
      />
      <meshPhongMaterial
        emissive={selected || hinted ? Color.lightblue : Color.darkblue}
        attach="material-1"
      />
      <meshPhongMaterial
        emissive={selected || hinted ? Color.lightblue : Color.darkblue}
        attach="material-2"
      />
      <meshPhongMaterial
        emissive={selected || hinted ? Color.lightblue : Color.darkblue}
        attach="material-3"
      />
      <meshPhongMaterial
        emissive={selected || hinted ? Color.lightblue : Color.darkblue}
        map={map}
        attach="material-4"
      />
      <meshPhongMaterial
        emissive={selected || hinted ? Color.lightblue : Color.darkblue}
        attach="material-5"
      />
      <Edges
        scale={1}
        color={selected || hinted ? Color.darkblue : Color.lightblue}
      />
    </animated.mesh>
  );
};
