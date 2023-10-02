import {
  // RouteProp,
  useNavigation, // useRoute,
} from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  ImageBackground,
  Linking,
  NativeModules,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTopInset } from '~/hooks/useInset';

import getImage from '~/libs/getImage';

import IconBack from '~/resources/Icons/IconBack';
import IconConfirmAdd from '~/resources/Icons/IconConfirmAdd';

import ButtonCustom from '~/base/ButtonCustom';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const RateUsPage = (): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const topInsets = useTopInset();
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [text, onChangeText] = React.useState('');
  const [starsValue, setStarsValue] = useState(0);

  const email = 'admin@apero.vn';
  const subject = 'Rating app Phone Tracker';

  const handleSubmit = () => {
    console.log(starsValue);

    if (starsValue <= 4.5) {
      Linking.openURL(`mailto:${email}?subject=${subject}&body=${text}`).catch(
        (error) => console.error('Error opening email client:', error),
      );
    } else {
      console.log('Sending to email....');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={getImage('imageBackgroundApp')}
      resizeMode='cover'
      style={{ flex: 1, paddingTop: topInsets }}>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={handleBack}>
            <IconBack width={28} height={28} />
          </TouchableOpacity>
          <Text
            style={{
              color: '#0057E7',
              fontWeight: '700',
              fontSize: 24,
              fontFamily: 'SFProDisplay-Medium',
              alignSelf: 'center',
              marginBottom: 20,
            }}>
            {t('Rate Us')}
          </Text>
          <Text style={{ width: 24 }} />
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
          }}>
          <View style={{ height: 48, alignItems: 'center' }}>
            <Stars
              default={0}
              count={5}
              half={true}
              starSize={100}
              update={(val) => setStarsValue(val)}
              spacing={25}
              fullStar={
                <View style={styles.starContainer}>
                  <Icon
                    name={'star'}
                    style={[styles.myStarStyle, styles.myFullStarStyle]}
                  />
                </View>
              }
              emptyStar={
                <Icon
                  name={'star-outline'}
                  style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                />
              }
              halfStar={
                <View style={styles.starContainer}>
                  <Icon
                    name={'star-half'}
                    style={[styles.myStarStyle, styles.myHalfStarStyle]}
                  />
                </View>
              }
            />
          </View>

          <View
            style={{
              paddingTop: 10,
              height: SCREEN_HEIGHT / 3,
            }}>
            <TextInput
              style={{
                height: SCREEN_HEIGHT / 3,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#D0D5DD',
                backgroundColor: '#FFF',
                textAlignVertical: 'top',
                paddingLeft: 14,
                color: '#000',
              }}
              placeholder='I want to...'
              value={text}
              onChangeText={onChangeText}
              multiline={true}
            />
          </View>
        </View>
        {/* {messageSuccess && (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 4,
              borderColor: '#B7EB8F',
              borderWidth: 1,
              backgroundColor: '#F6FFED',
              padding: 8,
              position: 'absolute',
              bottom: 150,
              alignSelf: 'center',
            }}>
            <IconConfirmAdd height={20} />
            <Text style={{ marginHorizontal: 8, color: '#000' }}>
              {t(`Great! - Feedback send successfully!`)}
            </Text>
          </View>
        )} */}
        <ButtonCustom
          style={{
            marginBottom: 32,
            width: SCREEN_WIDTH * 0.7,
            alignSelf: 'center',
          }}
          onPress={handleSubmit}
          title={t('Send')}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default RateUsPage;

const styles = StyleSheet.create({
  myStarStyle: {
    color: '#FFC403',
    backgroundColor: 'transparent',
    textShadowColor: '#FFC403',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontSize: 40,
  },
  myEmptyStarStyle: {
    color: '#FFC403',
  },
  myFullStarStyle: {
    color: '#FFC403', // Màu của ngôi sao đầy đủ
  },
  myHalfStarStyle: {
    color: '#FFC403', // Màu của nửa ngôi sao
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
