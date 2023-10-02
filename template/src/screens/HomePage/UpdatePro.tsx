import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  ImageBackground,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import getImage from '~/libs/getImage';

import IconCrownPro from '~/resources/Icons/IconCrownPro';
import { useAppTheme } from '~/resources/theme';

import { H4 } from '~/base/Typography';

interface UpdateProProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const UpdatePro = ({ onPress }: UpdateProProps): JSX.Element => {
  const theme = useAppTheme();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 16,
        height: 118,
        alignItems: 'center',
      }}>
      <ImageBackground
        imageStyle={{ borderRadius: 16 }}
        style={{
          height: 118,
          width: Dimensions.get('screen').width - 48,
          marginHorizontal: 24,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          justifyContent: 'space-between',
        }}
        source={getImage('artifyElements')}>
        <IconCrownPro height={80} width={83} />
        <View
          style={{
            marginRight: 12,
            flexDirection: 'column',
            width: Dimensions.get('screen').width / 2,
          }}>
          <H4
            style={{
              color: theme.colors.text,
              fontFamily: 'Urbanist-Bold',
              marginBottom: 8,
              textAlign: 'center',
            }}>
            {t('Upgrade to PRO')}
          </H4>
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: 'Urbanist-Medium',
              fontSize: 14,
              fontWeight: '500',
              marginBottom: 8,
              textAlign: 'center',
            }}>
            {t('Enjoy all features & benefits without any restrictions')}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default UpdatePro;
