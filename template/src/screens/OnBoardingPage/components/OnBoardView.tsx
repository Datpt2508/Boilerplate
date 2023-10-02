import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';

import { useTopInset } from '~/hooks/useInset';

import getImage from '~/libs/getImage';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const OnBoardView = () => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const navigation = useNavigation<RootNavigatorNavProps>();
  const animationRef = useRef<LottieView>(null);
  const topInsets = useTopInset();

  useEffect(() => {
    let loading = 0;

    const timeout = setTimeout(async () => {
      await setInterval(() => {
        loading = 1;

        setProgress(loading);
      });
    }, 1000);

    return () => {
      setTimeout(() => {
        clearTimeout(timeout);
        navigation.navigate('CreateProfilePage');
      }, 3000);
    };
  }, [progress]);

  useEffect(() => {
    animationRef.current?.play();
    animationRef.current?.play(30, 120);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={getImage('imageOnboarding')}
        resizeMode='cover'
        style={{ flex: 1, paddingTop: topInsets }}>
        <SafeAreaView style={{ flex: 1 }}>
          <LottieView
            ref={animationRef}
            source={require('~/resources/animation/animation_2.json')}
          />
          {/* <View style={{ paddingTop: 32, paddingHorizontal: 16 }}>
            <TouchableOpacity
              style={{ height: 32 }}
              onPress={() => navigation.goBack()}>
              <IconBack width={32} height={32} />
            </TouchableOpacity>
          </View>
          <ScrollView
            bounces={false}
            style={{ paddingHorizontal: 16 }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <View style={{ height: 650 }}>
              <FlatList
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlidesIndex}
                data={SlideItem}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                keyExtractor={(item, index) => index.toString()}
                onScroll={handleOnScroll}
              />
            </View>
            <View style={{ paddingTop: 10 }}>
              <CustomButton onPress={goNextSlide} title={t('Next')} />
            </View>
          </ScrollView> */}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default OnBoardView;
