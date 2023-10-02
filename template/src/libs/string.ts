export const capitalizeFirstLetter = (stringText: string): string => {
  return stringText?.charAt(0).toUpperCase() + stringText.slice(1);
};
export const letterCase = (stringText: string) => {
  return stringText.charAt(0).toUpperCase() + stringText.slice(1).toLowerCase();
};
