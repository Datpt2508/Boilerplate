import { PixelRatio } from 'react-native';

type WeserveFitType =
  | 'inside'
  | 'outside'
  | 'cover'
  | 'fill'
  | 'contain'
  | 'inside&we';

export const weserv = (
  url?: string,
  options?: {
    width?: number;
    height?: number;
    resize?: WeserveFitType;
  },
) => {
  const { width, height, resize } = options || {};
  const weserveDpr = PixelRatio.get();

  let productImagePath;

  if (!url) {
    productImagePath = `https://images.weserv.nl/?url=https://ucarecdn.com/ca3a59eb-98c0-4798-8741-82247c83fc99/defaultproduct.png`;
  } else {
    const weserveWidth = width ? `&w=${Math.floor(width)}` : '';
    const weserveHeight = height ? `&h=${Math.floor(height)}` : '';
    const weserveFit = resize ? `&fit=${resize}` : '';
    productImagePath = `https://images.weserv.nl/?url=${url}${weserveWidth}${weserveHeight}${weserveFit}&dpr=${weserveDpr}`;
  }

  return productImagePath;
};
