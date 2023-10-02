import {
  NavigationContainer as DefaultNavigationContainer,
  DefaultTheme,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, { ReactNode, memo, useRef } from 'react';

// import RNBootSplash from 'react-native-bootsplash';
import { RootNavigatorProps } from '~/navigation/RootNavigator';

type NavigationProviderProps = {
  children: ReactNode;
  theme: typeof DefaultTheme;
};

export const navigationRef = createNavigationContainerRef<RootNavigatorProps>();

const NavigationProvider = ({
  children,
  theme,
}: NavigationProviderProps): JSX.Element => {
  const routeNameRef = useRef<string>();

  const onReady = () => {
    const currentRouteName = navigationRef.current?.getCurrentRoute?.()?.name;
    routeNameRef.current = currentRouteName;
  };

  const onStateChange = async () => {
    try {
      const currentRouteName = navigationRef.current?.getCurrentRoute?.()?.name;
      routeNameRef.current = currentRouteName;
    } catch (err) {
      console.log(`Error in NavigationContainer onStateChange() - ${err}`);
    }
  };

  return (
    <DefaultNavigationContainer<RootNavigatorProps>
      ref={navigationRef}
      onReady={onReady}
      onStateChange={onStateChange}
      theme={theme}>
      {children}
    </DefaultNavigationContainer>
  );
};

export default memo(NavigationProvider);
