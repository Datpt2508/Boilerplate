import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

import getImage from '~/libs/getImage';

const AnimatedLoading = () => {
  return (
    <LottieView
      style={styles.lottieView}
      source={getImage('ball_loading')}
      autoPlay
      loop
      resizeMode='cover'
      speed={2.5}
    />
  );
};

const styles = StyleSheet.create({
  lottieView: {
    width: 360,
    height: 360,
  },
});

export default AnimatedLoading;
