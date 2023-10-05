/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AppState, Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Toast, { ErrorToast } from 'react-native-toast-message';

import usePreferenceContext from '~/hooks/usePreferenceContext';

import { CombinedDarkTheme, CombinedDefaultTheme } from '~/resources/theme';

import ModalContainer from '~/screens/components/ModalContainer';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ActionPreferenceProvider from '~/contextStore/ActionPreferenceContext';
import { PreferencesContext } from '~/contextStore/PreferencesContext';
import ToastProvider from '~/contextStore/ToastContext';
import NavigationContainer from '~/navigation/NavigationContainer';
import RootNavigator from '~/navigation/RootNavigator';

import './contextStore/TranslationContext';

const App = () => {
  const [isThemeDark, setIsThemeDark] = useState(true);

  const defaultTheme = isThemeDark ? CombinedDefaultTheme : CombinedDarkTheme;

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
