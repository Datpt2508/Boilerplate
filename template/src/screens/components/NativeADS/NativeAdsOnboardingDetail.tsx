/* eslint-disable @typescript-eslint/no-unused-vars */
import remoteConfig from '@react-native-firebase/remote-config';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NativeAdView, {
  CallToActionView,
  HeadlineView,
  IconView,
  TaglineView,
} from 'react-native-admob-native-ads';
import { ActivityIndicator } from 'react-native-paper';

import { ANDROID_NATIVE_TUTORIAL, IOS_NATIVE_TUTORIAL } from '@env';

const NativeAdsOnboardingDetail = React.memo(
  ({ onPress }: { onPress: (arg: boolean) => void }): JSX.Element => {
    const [aspectRatio, setAspectRatio] = useState(1.5);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const nativeAdRef = useRef<NativeAdView>(null);
    const [loadData, setLoadData] = useState({});

    const ID_Native =
      Platform.OS === 'android' ? ANDROID_NATIVE_TUTORIAL : IOS_NATIVE_TUTORIAL;

    const onAdFailedToLoad = (event) => {
      setError(true);
      setLoading(false);
      console.log('AD', 'FAILED', event);
      onPress(false);
    };

    const onAdLoaded = () => {
      console.log('AD', 'LOADED', 'Ad has loaded successfully');
      onPress(true);
    };

    const onAdClicked = () => {
      console.log('AD', 'CLICK', 'User has clicked the Ad');
    };

    const onAdImpression = () => {
      console.log('AD', 'IMPRESSION', 'Ad impression recorded');
    };

    const onNativeAdLoaded = (event: any) => {
      console.log('AD', 'RECIEVED', 'Unified ad  Recieved', event);
      setLoading(false);
      setLoaded(true);
      setError(false);
      // setAspectRatio(event.aspectRatio);
      setLoadData(event);
    };

    const onAdLeftApplication = () => {
      console.log('AD', 'LEFT', 'Ad left application');
    };

    useEffect(() => {
      if (!loaded) {
        nativeAdRef.current?.loadAd();
      } else {
        console.log('AD', 'LOADED ALREADY');
      }
    }, [loaded]);

    return (
      <NativeAdView
        ref={nativeAdRef}
        onAdLoaded={onAdLoaded}
        onAdFailedToLoad={onAdFailedToLoad}
        onAdLeftApplication={onAdLeftApplication}
        onAdClicked={onAdClicked}
        onAdImpression={onAdImpression}
        onNativeAdLoaded={onNativeAdLoaded}
        refreshInterval={5000}
        style={{
          width: '100%',
        }}
        videoOptions={{
          customControlsRequested: true,
        }}
        mediationOptions={{
          nativeBanner: true,
        }}
        adUnitID={ID_Native}>
        <View
          style={{
            width: Dimensions.get('screen').width - 32,
            height: 64,
            alignItems: 'center',
            borderRadius: 8,
            backgroundColor: '#D4D7D8',
            paddingHorizontal: 8,
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f0f0f0',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: !loading && !error && loaded ? 0 : 1,
              zIndex: !loading && !error && loaded ? 0 : 10,
            }}>
            {!loading && <ActivityIndicator size={28} color='#a9a9a9' />}
            {error && <Text style={{ color: '#a9a9a9' }}>:-(</Text>}
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              // paddingHorizontal: 12,
              // marginBottom: 8,
              // padding: 12,
              // backgroundColor: 'red',
              opacity: loading || error || !loaded ? 0 : 1,
            }}>
            <IconView
              style={{
                width: 40,
                height: 40,
              }}
            />

            <View
              style={{
                paddingHorizontal: 12,
                flexShrink: 1,
              }}>
              <HeadlineView
                style={{
                  fontWeight: '500',
                  color: '#000',
                  marginBottom: 4,
                  fontSize: 12,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <View
                  style={{
                    backgroundColor: '#76BCF5',
                    alignSelf: 'flex-start',
                    marginRight: 4,
                    marginTop: 4,
                  }}>
                  <Text style={{ color: '#FFF', fontSize: 8, padding: 2 }}>
                    Ad
                  </Text>
                </View>
                <TaglineView
                  numberOfLines={2}
                  style={{
                    fontSize: 10,
                    color: '#000',
                  }}
                />
              </View>
            </View>
            <CallToActionView
              style={[
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 10,
                  height: 36,
                  width: 80,
                  // marginBottom: 20,
                },
                Platform.OS === 'ios'
                  ? {
                      backgroundColor: '#1562EC',
                      borderRadius: 40,
                    }
                  : {},
              ]}
              buttonAndroidStyle={{
                backgroundColor: '#1562EC',
                borderRadius: 20,
              }}
              allCaps
              textStyle={{
                fontSize: 12,
                fontWeight: '500',
                flexWrap: 'wrap',
                textAlign: 'center',
                // marginBottom: Platform.OS === 'ios' ? 0 : 24,
                color: 'white',
              }}
            />
          </View>
        </View>
      </NativeAdView>
    );
  },
);
export default NativeAdsOnboardingDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
  },
});
