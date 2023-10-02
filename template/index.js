/**
 * @format
 */
import React, { useEffect, useRef, useState } from 'react';
import { AppRegistry, AppState, LogBox, Text } from 'react-native';
import { AdManager } from 'react-native-admob-native-ads';

import { APP_NAME, GOOGLE_MAP_KEY, TYPESENSE_ENVIRONMENT } from '@env';

import { name as appName } from './app.json';
import App from './src/App';

//disable font devices scaling
const setupFontScaling = () => {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
};

//Setup disable console warning messages
const setupLogBox = () => {
  if (__DEV__ === true) {
    const envVars = JSON.stringify(
      {
        APP_NAME,
        TYPESENSE_ENVIRONMENT,
        GOOGLE_MAP_KEY,
      },
      undefined,
      2,
    );
    console.log(`[Phone_Tracker]: Environment variable -> ${envVars}`);
    LogBox.ignoreLogs([
      'Warning: ...',
      'source.uri should not be an empty string',
      'Sending ',
    ]);
    LogBox.ignoreLogs(['Easing was renamed to EasingNode in Reanimated']);
    LogBox.ignoreLogs(['%s']);
  } else {
    LogBox.ignoreAllLogs();
  }
};

//Run function init
setupLogBox();
setupFontScaling();

const HeadlessCheck = () => {
  const [isMounted, setMounted] = useState(false);
  const needsMountingRef = useRef(false);

  useEffect(() => {
    if (AppState.currentState !== 'background') {
      setMounted(true);
    } else {
      needsMountingRef.current = true;
    }

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active' && needsMountingRef.current) {
        setMounted(true);
      }
    });

    return () => subscription.remove();
  }, []);

  return isMounted ? <App /> : null;
};

AdManager.subscribe('imageAd', 'onAdPreloadClicked', () => {
  console.log('click', 'imageAd');
});

AppRegistry.registerComponent(appName, () => HeadlessCheck);
