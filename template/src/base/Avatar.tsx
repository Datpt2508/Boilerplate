import React, { useMemo } from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import CloseIcon from '~/resources/Icons/IconCloseAvatar';
import EditIcon from '~/resources/Icons/IconEditAvatar';
import { useAppTheme } from '~/resources/theme';

import { Xsmall } from '~/base/Typography';

interface AvatarProps {
  image: string;
  type:
    | 'default'
    | 'online'
    | 'offline'
    | 'edit'
    | 'close'
    | 'live'
    | 'statusViewed';
  sizeAvatar: 'S' | 'M' | 'L' | 'XL';
}
const Avatar = ({ image, type, sizeAvatar }: AvatarProps) => {
  const source = image
    ? { uri: image }
    : require('~/resources/images/avatarDefault.png');

  const sizeStyle = () => {
    switch (sizeAvatar) {
      case 'S':
        return 20;
      case 'M':
        return 60;
      case 'L':
        return 80;
      case 'XL':
        return 120;
      default:
        return 48;
    }
  };

  const theme = useAppTheme();
  const themeColor = theme.colors;

  const getBorderWith = (type: string) => {
    switch (type) {
      case 'statusViewed':
        return 5;
      default:
        return 0;
    }
  };
  const getStatusStyle = () => {
    switch (type) {
      case 'edit':
      case 'default':
      case 'live':
      case 'statusViewed':
      case 'close':
        return styles.defaultAvatar;
    }
  };
  const getBorderColor = (type: string) => {
    switch (type) {
      case 'statusViewed':
        return themeColor.grayBorder;
      default:
        return themeColor.white;
    }
  };
  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'online':
        return themeColor.info;
      case 'offline':
        return themeColor.grayViewed;
      case 'live':
        return '#F75555';
    }
  };
  const getBorderRadius = (type: string) => {
    switch (type) {
      case 'statusViewed':
        return 50;
      default:
        return 0;
    }
  };

  const customStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        backgroundColor: getBackgroundColor(type),
      },
    ],
    [type],
  );

  const statusStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        borderColor: getBorderColor(type),
        borderRadius: getBorderRadius(type),
        borderWidth: getBorderWith(type),
      },
    ],
    [type],
  );

  return (
    <View style={[styles.container, statusStyle]}>
      <LinearGradient
        colors={[themeColor.gradientRedFist, themeColor.gradientRedSecond]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={[
          type == 'live'
            ? [
                styles.linearGradient,
                { width: sizeStyle() + 10, height: sizeStyle() + 10 },
              ]
            : styles.radiusStyle,
        ]}>
        <Image
          source={source}
          style={[styles.image, { width: sizeStyle(), height: sizeStyle() }]}
        />
      </LinearGradient>

      {type === 'close' ? (
        <CloseIcon
          width={sizeStyle() / 4}
          height={sizeStyle() / 4}
          style={styles.iconType}
        />
      ) : type === 'edit' ? (
        <EditIcon
          width={sizeStyle() / 4}
          height={sizeStyle() / 4}
          style={styles.iconType}
        />
      ) : type === 'live' ? (
        <View style={[styles.liveStatus, customStyle]}>
          <Xsmall color={themeColor.white}>LIVE</Xsmall>
        </View>
      ) : (
        <View
          style={[
            styles.type,
            getStatusStyle(),
            customStyle,
            { width: sizeStyle() / 3, height: sizeStyle() / 3 },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveStatus: {
    bottom: -15,
    position: 'absolute',
    borderRadius: 6,
    width: 42,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 50,
  },
  type: {
    position: 'absolute',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    bottom: -2,
    right: -2,
  },
  iconType: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    right: 0,
  },
  defaultAvatar: {
    display: 'none',
  },
  defaultImage: {
    borderWidth: 0,
  },
  radiusStyle: {
    borderRadius: 50,
  },
});

export default Avatar;
