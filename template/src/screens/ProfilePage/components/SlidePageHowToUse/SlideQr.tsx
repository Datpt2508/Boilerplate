import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { dataOnboardingLocate } from '~/dummyData/DataOnBoarding/dataOnboardingLocate';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const SlideQr = () => {
  const { t } = useTranslation();

  const slides = dataOnboardingLocate;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapContent}>
        <View style={styles.wrapText}>
          <Text style={styles.titleStyle}>{t(slides[2].title)}</Text>
        </View>
        <Image source={slides[2].image} style={styles.imageStyle} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: heightScreen,
    width: widthScreen,
    resizeMode: 'repeat',
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapContent: {
    width: widthScreen - 32,
    paddingHorizontal: 16,
  },
  wrapText: {
    height: 160,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  imageStyle: {
    height: 350,
    width: '100%',
    resizeMode: 'contain',
    marginLeft: -10,
  },
  titleStyle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 30,
    lineHeight: 40,
    color: '#262626',
    paddingTop: 18,
  },
});

export default SlideQr;
