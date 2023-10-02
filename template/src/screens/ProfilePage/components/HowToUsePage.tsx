import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTopInset } from '~/hooks/useInset';

import getImage from '~/libs/getImage';

import IconBack from '~/resources/Icons/IconBack';
import { useAppTheme } from '~/resources/theme';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

import Pagination from './Pagination';
import SlideCode from './SlidePageHowToUse/SlideCode';
import SlideMap from './SlidePageHowToUse/SlideMap';
import SlideQr from './SlidePageHowToUse/SlideQr';
import SlideView from './SlidePageHowToUse/SlideView';

const widthScreen = Dimensions.get('window').width;

const HowToUsePage = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const theme = useAppTheme();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentSlideIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const topInsets = useTopInset();

  const handleOnScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
    },
  );
  const SlideItem = [<SlideView />, <SlideMap />, <SlideQr />, <SlideCode />];
  const renderItem = ({ item }) => {
    return item;
  };

  const updateCurrentSlidesIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / widthScreen);
    setCurrentIndex(currentIndex);
  };

  const handleSkip = () => {
    navigation.navigate('BottomTabNavigator', {
      screen: 'ProfileNavigator',
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={getImage('imageBackgroundApp')}
        resizeMode='cover'
        style={{ flex: 1, paddingTop: topInsets }}>
        <View style={styles.wrapFlatList}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <IconBack width={32} height={32} />
          </TouchableOpacity>
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
        <Pagination
          data={SlideItem}
          scrollX={scrollX}
          index={currentSlideIndex}
        />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapFlatList: {
    flex: 1,
    width: widthScreen,
  },
  skipButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderColor: '#D4D7D8',
    position: 'absolute',
    left: 16,
    zIndex: 1,
    ...Platform.select({
      ios: {
        top: 80,
      },
      android: {
        top: 32,
      },
    }),
  },
});

export default HowToUsePage;
