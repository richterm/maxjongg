import { Dimensions } from "./board";

export const shuffle = (a: Array<any>) => {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

export const getRandomIndex = (max: number) => Math.floor(Math.random() * max);

export const getRandomColor = () => {
  return `rgba(${getRandomIndex(256)}, ${getRandomIndex(256)}, ${getRandomIndex(256)}, 0.9)`
}

export const getBoundsMargin = (dimensions: Dimensions) => {
  const min = Math.min(dimensions.maxs.x, dimensions.maxs.y);
  const max = Math.max(dimensions.maxs.x, dimensions.maxs.y);
  const margin = Math.ceil((min/max*10))/10;

  return margin;
}