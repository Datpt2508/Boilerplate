import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

type ProgressiveImageProps = {
  withLoading?: boolean;
} & FastImageProps;

const ProgressiveImage = ({
  withLoading = true,
  ...props
}: ProgressiveImageProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const onLoad = () => {
    setImageLoaded(false);
  };

  const onLoadEnd = () => {
    setImageLoaded(true);
  };

  return (
    <View style={styles.container}>
      {!imageLoaded && withLoading ? (
        <ActivityIndicator
          style={styles.loadingContainer}
          pointerEvents='none'
          size='large'
        />
      ) : null}
      <FastImage onLoadStart={onLoad} onLoadEnd={onLoadEnd} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  loadingContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default ProgressiveImage;
