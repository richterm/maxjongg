import React from "react";

export const viewBox = "-210 310 210 255";

export const NaturalShadowFilter = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 0, height: 0 }}>
      <filter id="naturalShadow" x="0" y="0" width="1" height="1">
        <feOffset in="SourceGraphic" dx="1" dy="1" />
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </svg>
  );
};
