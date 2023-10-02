export const adjustResolution = (
  width: number,
  height: number,
): { width: number; height: number } => {
  const maxSize = 896;

  // Calculate the aspect ratio
  const aspectRatio = width / height;

  // Determine which dimension (width or height) needs to be adjusted
  if (width > height) {
    // Adjust the width
    const adjustedWidth = Math.min(maxSize, width);
    const adjustedHeight = Math.round(adjustedWidth / aspectRatio);

    return { width: adjustedWidth, height: adjustedHeight };
  } else {
    // Adjust the height
    const adjustedHeight = Math.min(maxSize, height);
    const adjustedWidth = Math.round(adjustedHeight * aspectRatio);

    return { width: adjustedWidth, height: adjustedHeight };
  }
};
