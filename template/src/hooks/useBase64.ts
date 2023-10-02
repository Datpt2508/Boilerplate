import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

import RNFetchBlob from 'rn-fetch-blob';

export const convertBase64ToPNG = async (base64Data: string) => {
  const outputPath = `generated_image_${Date.now()}.png`;
  try {
    const base64Image = base64Data.replace(
      /^data:image\/(png|jpeg);base64,/,
      '',
    );
    const imagePath = `${RNFS.DocumentDirectoryPath}/${outputPath}`;
    await RNFS.writeFile(imagePath, base64Image, 'base64');
    return imagePath;
  } catch (error) {
    console.log('Error converting Base64 to PNG:', error);
    return null;
  }
};

export const saveBase64ImageAsPNG = async (base64Data: string) => {
  const outputPath = `generated_image_${Date.now()}.png`;
  const pngImagePath = await convertBase64ToPNG(base64Data, outputPath);
  if (pngImagePath) {
    // console.log('PNG image saved at:', pngImagePath);
    return pngImagePath;
  } else {
    console.log('Failed to convert Base64 to PNG');
  }
};

export const downloadImage = async (base64Data: string) => {
  const fileName = `generated_image_${Date.now()}.png`;
  const imagePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  try {
    await RNFS.writeFile(imagePath, base64Data, 'base64');
    console.log('Image downloaded successfully:', imagePath);
  } catch (error) {
    console.log('Failed to download image:', error);
  }
};

export const convertURLImagesToBase64 = async (
  imageUrls: string[],
): Promise<{ base64: string }[]> => {
  const base64Array: { base64: string }[] = [];
  console.log('imageUrls', imageUrls);
  try {
    for (const imageUrl of imageUrls) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        const json = base64Data.split(',')[1];
        base64Array.push({ base64: json });
      } catch (error) {
        console.log('Error converting image to base64:', error);
        throw error;
      }
    }
    console.log('🚀 ~ file: useBase64.ts:63 ~ base64Array:', base64Array);

    return base64Array;
  } catch (error) {
    console.log('Error converting images to base64:', error);
    throw error;
  }
};

export const convertSingleURLImagesToBase64 = async (
  imageUrl: string,
): Promise<string> => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    const base64String = base64Data.split(',')[1];

    return base64String;
  } catch (error) {
    console.log('Error converting image to base64:', error);
    throw error;
  }
};

export const convertLocalImageToBase64 = async (filePath: string) => {
  try {
    const imageUri = 'file://' + `${filePath}`;

    if (Platform.OS === 'ios') {
      const arr = imageUri.split('/');
      const filePathImage = `${RNFetchBlob.fs.dirs.DocumentDir}/${
        arr[arr.length - 1]
      }`;

      return await RNFS.readFile(filePathImage, 'base64');
    } else {
      return await RNFS.readFile(imageUri, 'base64');
    }

    console.log('Convert local image to base64 success');
    // return base64Data;
  } catch (error) {
    console.log('Error converting local image to base64:', error);
  }
};

export const convertULRToLocalFilePath = async (url: string) => {
  try {
    const response = await RNFetchBlob.config({
      fileCache: true,
    }).fetch('GET', url);

    const localFilePath = response.path();
    console.log(
      '🚀 ~ file: useBase64.ts:106 ~ getLocalFilePath ~ localFilePath:',
      localFilePath,
    );

    return localFilePath;
  } catch (error) {
    console.error('Error while fetching and saving the file:', error);
    return null;
  }
};
