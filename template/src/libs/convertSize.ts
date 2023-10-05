export const adjustResolution = (
  width: number,
  height: number,
): { width: number; height: number } => {
  const maxSize = 896;

  const aspectRatio = width / height;

  if (width > height) {
    const adjustedWidth = Math.min(maxSize, width);
    const adjustedHeight = Math.round(adjustedWidth / aspectRatio);

    return { width: adjustedWidth, height: adjustedHeight };
  } else {
    const adjustedHeight = Math.min(maxSize, height);
    const adjustedWidth = Math.round(adjustedHeight * aspectRatio);

    return { width: adjustedWidth, height: adjustedHeight };
  }
};
