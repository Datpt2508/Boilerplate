import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { IconButton, ProgressBar } from 'react-native-paper';
import WebView from 'react-native-webview';

import { useTopInset } from '~/hooks/useInset';
import useScale from '~/hooks/useScale';

import IconClose from '~/resources/Icons/IconClose';
import IconRefresh from '~/resources/Icons/IconRefresh';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `;

const WebViewPage = ({ route }): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);

  const webViewRef = useRef<WebView | null>(null);
  const uri = route?.params?.uri;

  const { vScale } = useScale();

  const onRefreshPress = (): void => webViewRef.current?.reload?.();

  const onLoadStart = (): void => setLoading(true);
  const onLoadEnd = (): void => setLoading(false);

  const navigation = useNavigation<RootNavigatorNavProps>();

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            // paddingTop: topInsets,
          }}>
          <View style={{}}>
            <IconButton
              size={vScale * 24}
              onPress={onBackPress}
              icon={({ color, size }) => (
                <IconClose color={color} width={size} height={size} />
              )}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={{}}>
              {uri}
            </Text>
          </View>
          <View style={{}}>
            <IconButton
              size={vScale * 32}
              onPress={onRefreshPress}
              icon={({ color, size }) => (
                <IconRefresh color={color} width={size} height={size} />
              )}
            />
          </View>
        </View>

        <ProgressBar indeterminate visible={loading} />
        <View style={{ flex: 1 }}>
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            sharedCookiesEnabled={true}
            ref={webViewRef}
            style={styles.webView}
            source={{
              uri: uri,
            }}
            injectedJavaScript={INJECTEDJAVASCRIPT}
            // onNavigationStateChange={onNavigationStateChange}
            onLoadStart={onLoadStart}
            onLoadEnd={onLoadEnd}
            // onScroll={scrollHandler}
          />
        </View>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webView: {
    flex: 1,
  },
});

export default WebViewPage;
