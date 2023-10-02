import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import useModalManager from '~/hooks/useModalManager';
import usePreferenceActionsContext from '~/hooks/usePreferenceActionsContext';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import IconAbout from '~/resources/Icons/IconAbout';
import IconArrowRight2 from '~/resources/Icons/IconArrowRight2';
import IconBack from '~/resources/Icons/IconBack';
import IconCrownSetting from '~/resources/Icons/IconCrownSetting';
import IconDeleteMode from '~/resources/Icons/IconDeleteMode';
import IconKey from '~/resources/Icons/IconKey';
import IconLanguage from '~/resources/Icons/IconLanguage';
import IconManageEdit from '~/resources/Icons/IconManageEdit';
import IconSecurity from '~/resources/Icons/IconSecurity';
import { useAppTheme } from '~/resources/theme';

import UpdatePro from '~/screens/HomePage/UpdatePro';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';

const linkPolicy =
  'https://sites.google.com/view/phone-tracker-location-policy/home';
const linkTerm =
  'https://sites.google.com/view/phone-tracker-term-of-service/home';

const SettingPage = (): JSX.Element => {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { openModal } = useModalManager();
  const isPro = usePreferenceContext()?.result?.isPurchase;
  const actionMethod = usePreferenceActionsContext();

  const handleDeleteAi = async () => {
    Alert.alert(
      t('Warning'),
      t(
        'You are deleting the trained model. You will have to retrain the new model',
      ),
      [
        {
          text: t('Cancel'),
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: t('OK'),
          onPress: async () => {
            await AsyncStorage.removeItem('isModelTraining');
            await AsyncStorage.removeItem('estimatedTime');
            await AsyncStorage.removeItem('modelId');
            actionMethod?.setActionModelId?.('');
            Alert.alert(t('Delete model success'));
          },
        },
      ],
    );
  };
  const handleUpdatePro = () => {
    openModal('PurchaseDetailModal', true);
  };
  return (
    <View style={[styles.container]}>
      <SafeAreaView style={styles.Area}>
        <View style={styles.content}>
          <View style={styles.head}>
            <View style={styles.headLeft}>
              <View style={styles.iconBack}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <IconBack width={28} height={28} />
                </TouchableOpacity>
              </View>
              <View style={styles.title}>
                <Text style={[styles.textHead]}>{t('Settings')}</Text>
              </View>
            </View>
          </View>
          {!isPro && (
            <View style={styles.headImg}>
              <UpdatePro onPress={handleUpdatePro} />
            </View>
          )}

          <View style={styles.dividerContent}>
            <Text style={styles.textDivider}>{t('Ai avatar')}</Text>
            <View style={styles.divider} />
          </View>
          <TouchableOpacity style={styles.deleteMode} onPress={handleDeleteAi}>
            <IconDeleteMode />
            <Text style={styles.textDeleteMode}>{t('Delete AI mode')}</Text>
          </TouchableOpacity>
          <View style={styles.dividerContent}>
            <Text style={styles.textDivider}>{t('General')}</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.listItem}>
            <TouchableOpacity onPress={() => Linking.openURL(linkTerm)}>
              <View style={styles.people}>
                <View style={styles.detailInfor}>
                  <View style={styles.iconService}>
                    <View>
                      <IconSecurity width={24} height={24} />
                    </View>
                    <Text style={[styles.textTitle]}>
                      {t('Terms & Conditions')}
                    </Text>
                  </View>
                  <IconArrowRight2 width={24} height={24} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL(linkPolicy)}>
              <View style={styles.people}>
                <View style={styles.detailInfor}>
                  <View style={styles.iconService}>
                    <View>
                      <IconKey width={24} height={24} />
                    </View>
                    <Text style={[styles.textTitle]}>
                      {t('Privacy Policy')}
                    </Text>
                  </View>
                  <IconArrowRight2 width={24} height={24} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectLanguagePage')}>
              <View style={styles.people}>
                <View style={styles.detailInfor}>
                  <View style={styles.iconService}>
                    <View>
                      <IconLanguage width={24} height={24} />
                    </View>
                    <Text style={[styles.textTitle]}>{t('Language')}</Text>
                  </View>
                  <IconArrowRight2 width={24} height={24} />
                </View>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => {}}>
              <View style={styles.people}>
                <View style={styles.detailInfor}>
                  <View style={styles.iconService}>
                    <View>
                      <IconAbout width={24} height={24} />
                    </View>
                    <Text style={[styles.textTitle]}>{t('About Ichime')}</Text>
                  </View>
                  <IconArrowRight2 width={24} height={24} />
                </View>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  Area: {
    flex: 1,
  },
  content: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBack: {
    paddingRight: 8,
  },
  headImg: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  linear: {
    height: 142,
    width: '100%',
    borderRadius: 16,
  },
  contentQC: {
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 12,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',

    height: '100%',
    justifyContent: 'space-between',
  },
  contentRight: {
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  iconService: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentRightFooter: {
    flexDirection: 'row',
    backgroundColor: 'rgba(18, 18, 22, 1)',
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 12,
    borderRadius: 99,
  },
  manage: {
    color: '#ffffff',
    fontFamily: 'Urbanist',
    paddingRight: 8,
  },
  yourPlan: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'Urbanist',
    fontWeight: '500',
  },
  Diamond: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'Urbanist',
  },
  textHead: {
    fontSize: 24,
    fontWeight: '700',
    alignItems: 'center',
    color: '#ffffff',
    fontFamily: 'Urbanist',
  },
  headLeft: {
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    width: '80%',
    textAlign: 'center',
    alignItems: 'center',
  },
  listItem: {
    paddingTop: 29,
  },
  rotate: {
    transform: [{ rotate: '90deg' }],
  },
  people: {
    justifyContent: 'space-between',
    lineHeight: 25,
    paddingBottom: 32,
  },
  detailInfor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'Urbanist',
    paddingLeft: 8,
  },

  divider: {
    backgroundColor: 'rgba(53, 56, 63, 1)',
    height: 1,
    width: '80%',
  },
  dividerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textDivider: {
    color: 'rgba(158, 158, 158, 1)',
    fontFamily: 'Urbanist',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteMode: {
    paddingVertical: 24,
    flexDirection: 'row',
  },
  textDeleteMode: {
    color: '#ffffff',
    paddingLeft: 12,
    fontSize: 18,
    fontFamily: 'Urbanist',
    fontWeight: '700',
  },
});

export default SettingPage;
