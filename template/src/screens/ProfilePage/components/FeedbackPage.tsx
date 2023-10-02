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
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTopInset } from '~/hooks/useInset';

import getImage from '~/libs/getImage';

import IconBack from '~/resources/Icons/IconBack';
import IconConfirmAdd from '~/resources/Icons/IconConfirmAdd';
import { useAppTheme } from '~/resources/theme';

import ButtonCustom from '~/base/ButtonCustom';
import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const FeedbackPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const topInsets = useTopInset();
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [text, onChangeText] = React.useState('');
  const email = 'admin@apero.vn';
  const subject = 'Feedback using the app Phone Tracker';

  const handleSubmit = () => {
    Linking.openURL(`mailto:${email}?subject=${subject}&body=${text}`).catch(
      (error) => console.error('Error opening email client:', error),
    );
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
            {t('Feedback')}
          </Text>
          <Text style={{ width: 24 }} />
        </View>
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 16,
          }}>
          <View
            style={{
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
        </ScrollView>
        {/* {messageSuccess && (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 4,
              borderColor: '#B7EB8F',
              backgroundColor: '#F6FFED',
              borderWidth: 1,
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
export default FeedbackPage;

const styles = StyleSheet.create({});
