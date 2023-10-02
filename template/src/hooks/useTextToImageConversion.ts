import { useEffect, useState } from 'react';
import RNFS from 'react-native-fs';

const useTextToImageConversion = (
  textPrompts: string,
  height: number,
  width: number,
  stylePreset?: string,
) => {
  const engineId = 'stable-diffusion-v1-5';
  const apiHost = 'https://api.stability.ai';
  const apiKey = 'sk-eTGtLkujdfcDd4A8Qqli1kSN7TEgLdyn8AlaxJwYlyv0QjTy';

  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiHost}/v1/generation/${engineId}/text-to-image`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              text_prompts: [
                {
                  text: textPrompts,
                },
              ],
              height: height,
              width: width,
              cfg_scale: 7,
              clip_guidance_preset: 'FAST_BLUE',
              style_preset: stylePreset,
              samples: 4,
              steps: 30,
            }),
          },
        );

        if (!response.ok) {
          throw new Error(`Non-200 response: ${await response.text()}`);
        }

        const responseJSON = await response.json();
        console.log(
          '🚀 ~ file: useTextToImageConversion.ts:50 ~ fetchData ~ responseJSON:',
          responseJSON,
        );
        setImageData(responseJSON.artifacts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [textPrompts, height, width, stylePreset]);

  return imageData;
};

export default { useTextToImageConversion };
