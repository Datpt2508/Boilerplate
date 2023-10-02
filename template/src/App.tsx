/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import {
  onMoveToBackground,
  onMoveToForeground,
} from '@quan2nd/react-native-activity-state';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AppState, Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAppOpenAd } from 'react-native-google-mobile-ads';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Toast, { ErrorToast } from 'react-native-toast-message';

import usePreferenceContext from '~/hooks/usePreferenceContext';

import { CombinedDarkTheme, CombinedDefaultTheme } from '~/resources/theme';

import ModalContainer from '~/screens/components/ModalContainer';

import { ANDROID_APP_OPEN_RESUME, IOS_APP_OPEN_RESUME } from '@env';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ActionPreferenceProvider from '~/contextStore/ActionPreferenceContext';
import { PreferencesContext } from '~/contextStore/PreferencesContext';
import ToastProvider from '~/contextStore/ToastContext';
import NavigationContainer from '~/navigation/NavigationContainer';
import RootNavigator from '~/navigation/RootNavigator';

import './contextStore/TranslationContext';

const ID_ADS_RESUME =
  Platform?.OS === 'ios' ? IOS_APP_OPEN_RESUME : ANDROID_APP_OPEN_RESUME;

const App = () => {
  const [isThemeDark, setIsThemeDark] = useState(true);
  const appState = useRef(AppState.currentState);
  const resultContext = usePreferenceContext();

  const isRemoteResumeAds = resultContext?.result?.adsMobState?.App_open_resume;
  // const isShowInterAds = resultContext?.result?.isShowInterstitial;

  const defaultTheme = isThemeDark ? CombinedDefaultTheme : CombinedDarkTheme;

  const { load, show, isLoaded } = useAppOpenAd(ID_ADS_RESUME);

  useEffect(() => {
    load();
  }, [load]);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', (nextAppState) => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log('AppState------------->', appState.current);
  //       try {
  //         if (isRemoteResumeAds) {
  //           show();
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }

  //     setTimeout(() => {
  //       load();
  //     }, 20);

  //     appState.current = nextAppState;
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, [isLoaded]);

  useEffect(() => {
    const subscriptionFore = onMoveToForeground(() => {
      console.log('onMoveToForeground');
      try {
        if (isRemoteResumeAds) {
          show();
        }
      } catch (err) {
        console.log(err);
      }
    });

    const subscriptionBack = onMoveToBackground(() => {
      console.log('onMoveToBackground');
      try {
        if (isRemoteResumeAds) {
          show();
        }
      } catch (err) {
        console.log(err);
      }
    });

    setTimeout(() => {
      load();
    }, 20);

    return () => {
      subscriptionFore.remove();
      subscriptionBack.remove();
    };
  }, [isLoaded]);

  useEffect(() => {
    // const statusBarStyle = isThemeDark ? 'dark-content' : 'light-content';
    StatusBar.setBarStyle('dark-content');
    Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
    Platform.OS === 'android' && StatusBar.setTranslucent(true);
  }, [isThemeDark]);

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  const toastConfig = {
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 20,
          fontWeight: '500',

          color: '#ff9966',
        }}
        text2Style={{
          fontSize: 16,
          color: 'red',
          marginTop: 4,
          fontWeight: '600',
        }}
        contentContainerStyle={{ backgroundColor: '#35383F' }}
        style={{ borderLeftColor: 'red' }}
      />
    ),
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={defaultTheme}>
          <ActionPreferenceProvider>
            <NavigationContainer theme={defaultTheme}>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <ToastProvider>
                  <BottomSheetModalProvider>
                    <RootNavigator />
                    <ModalContainer />
                    <Toast config={toastConfig} />
                  </BottomSheetModalProvider>
                </ToastProvider>
              </GestureHandlerRootView>
            </NavigationContainer>
          </ActionPreferenceProvider>
        </PaperProvider>
      </PreferencesContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;
